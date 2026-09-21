/**
 * Permanent redirect configurations.
 * Legacy package routes are repointed to the curated experience page.
 */
export const PACKAGE_REDIRECTS = [
  { source: "/packages", destination: "/experiences", permanent: true },
  { source: "/packages/:slug", destination: "/experiences", permanent: true },
] as const;
