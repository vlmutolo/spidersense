# Deployment

GitHub Actions validates pull requests and `main` with read-only repository permissions. Validation runs source checks, the end-to-end suite, and a production build without deployment credentials.

A successful `main` validation unlocks the `production` deployment job. The job builds the same revision and exposes Cloudflare credentials only to the final Wrangler command. The `production` GitHub environment holds:

- `CLOUDFLARE_API_TOKEN` as an environment secret.
- `CLOUDFLARE_ACCOUNT_ID` as an environment variable.

The Cloudflare token grants Workers Scripts write access for the single deployment account. Additional permissions accompany features that require them, such as Workers Routes for a custom domain or storage permissions for bound data services.

The repository workflow uses the `pull_request` event, immutable action revisions, read-only `GITHUB_TOKEN` permissions, ephemeral GitHub-hosted runners, and a protected deployment environment. Dependabot proposes updates for JavaScript, Rust, and GitHub Actions dependencies.
