# Deployment

SpiderSense is served at `https://spidersense.app` by the `spidersense` Cloudflare Worker. Cloudflare manages the custom-domain DNS record and TLS certificate. The Worker also remains available at `https://spidersense.vlmutolo.workers.dev`.

GitHub Actions uses the pinned Vite+ setup action to install the declared Node.js, pnpm, and Vite+ versions. It validates pull requests and `main` with read-only repository permissions. Validation runs source checks, contract tests, the end-to-end suite, and a production build without deployment credentials.

A successful `main` validation automatically starts the `production` deployment job. The job builds the same revision and exposes Cloudflare credentials only to the final Wrangler command. The `production` GitHub environment holds:

- `CLOUDFLARE_API_TOKEN` as an environment secret.
- `CLOUDFLARE_ACCOUNT_ID` as an environment variable.

The Cloudflare token grants Workers Scripts write access for the single deployment account. Custom-domain routing is managed in the Cloudflare dashboard. Additional permissions accompany features that require them, such as storage permissions for bound data services.

The repository workflow uses the `pull_request` event, immutable action revisions, read-only `GITHUB_TOKEN` permissions, ephemeral GitHub-hosted runners, and a credential-scoped deployment environment. Dependabot proposes updates for JavaScript, Rust, and GitHub Actions dependencies.

The Vite Task deployment entry is non-cacheable and has no task dependencies. Validation and production builds run before the credential-bearing deployment step.
