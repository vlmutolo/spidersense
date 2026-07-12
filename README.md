# SpiderSense

SpiderSense is an interactive ZX calculus diagram explorer and rewrite tool.

## Development

The project uses Node.js 24, pnpm 10.33, Rust 1.94, and wasm-pack 0.15. Install `wasm-pack`, then install the JavaScript dependencies and start the app:

```sh
cargo install wasm-pack --version 0.15.0 --locked
pnpm install
pnpm dev
```

The primary verification commands are:

```sh
pnpm check
pnpm run audit
pnpm test:e2e
pnpm build
```

The E2E command accepts an empty suite while the scaffold has no product behavior. Every future deployment remains gated on this command.

Architecture and deployment details live in [`docs/architecture.md`](docs/architecture.md) and [`docs/deployment.md`](docs/deployment.md).

## License

SpiderSense is available under either the [MIT License](LICENSE-MIT) or the [Apache License 2.0](LICENSE-APACHE), at your option.
