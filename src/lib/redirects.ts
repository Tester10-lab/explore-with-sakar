/**
 * Permanent redirect configurations.
 * Legacy package routes are repointed to the curated experience page.
 */
export const PACKAGE_REDIRECTS = [
  { source: "/packages", destination: "/experience", permanent: true },
  { source: "/packages/:slug", destination: "/experience", permanent: true },
] as const;
