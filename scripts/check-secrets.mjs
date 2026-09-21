#!/usr/bin/env node
/**
 * check-secrets.mjs
 * Q0 secrets hygiene gate.
 *
 * Fails (exit 1) if any tracked file at HEAD contains a connection string
 * with embedded credentials (user:pass@host pattern).
 *
 * Ignores:
 *  - Placeholder-only lines (e.g. "mongodb+srv://USER:PASS@host" with ALL-CAPS tokens)
 *  - Files listed in .gitignore / untracked files (git grep only covers tracked files)
 *  - .env.example (intentionally contains placeholder examples)
 *
 * Usage: node scripts/check-secrets.mjs
 */

import { execSync } from 'child_process';

// Regex for a credentialed URI: scheme://user:pass@host where user or pass is non-placeholder
// A placeholder is entirely uppercase letters, digits, underscores, and hyphens.
const CRED_PATTERN = /[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^/\s:@]+:[^@\s]+@/;
const PLACEHOLDER_PATTERN = /[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[A-Z0-9_-]+:[A-Z0-9_-]+@/;

let output;
try {
  output = execSync('git grep -nE "://[^/[:space:]:@]+:[^@[:space:]]+@" -- .', {
    encoding: 'utf8',
    // exit code 1 = no matches (grep convention) — treat as success
  });
} catch (err) {
  if (err.status === 1) {
    // grep found nothing
    console.log('check:secrets PASS — no credentialed URIs found in tracked files.');
    process.exit(0);
  }
  // Actual error
  console.error('check:secrets ERROR running git grep:', err.message);
  process.exit(2);
}

// If we get here, git grep found something. Filter out placeholders and .env.example.
const lines = output.split('\n').filter(Boolean);
const violations = lines.filter(line => {
  // Skip .env.example and check-secrets.mjs itself
  if (line.startsWith('.env.example:') || line.startsWith('scripts/check-secrets.mjs:')) return false;
  // Extract the matched content after the line number
  const content = line.split(':').slice(2).join(':');
  // Skip if all tokens in the credentials are uppercase-only placeholders
  if (PLACEHOLDER_PATTERN.test(content) && !CRED_PATTERN.test(content.replace(PLACEHOLDER_PATTERN, ''))) {
    return false;
  }
  // Check if it looks like a real credential (non-all-uppercase user or pass)
  const match = CRED_PATTERN.exec(content);
  if (!match) return false;
  // Extract the user:pass portion
  const uriPart = match[0];
  const credPart = uriPart.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, '').replace(/@$/, '');
  const [user, ...passParts] = credPart.split(':');
  const pass = passParts.join(':');
  // If both user and pass are ALL_CAPS placeholders, skip
  const isPlaceholder = /^[A-Z0-9_-]+$/.test(user) && /^[A-Z0-9_-]+$/.test(pass);
  return !isPlaceholder;
});

if (violations.length === 0) {
  console.log('check:secrets PASS — no credentialed URIs found in tracked files.');
  process.exit(0);
} else {
  console.error('check:secrets FAIL — credentialed URIs found in tracked files:');
  for (const v of violations) {
    // Print file:line only — never print the credential value itself
    const parts = v.split(':');
    const file = parts[0];
    const lineNum = parts[1];
    console.error(`  ${file}:${lineNum} — contains embedded credentials`);
  }
  console.error('');
  console.error('Action required: remove the credential from the file.');
  console.error('If it is in git history, the owner must rewrite history and rotate the secret.');
  process.exit(1);
}
