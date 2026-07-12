# SpiderSense

SpiderSense is an interactive ZX calculus diagram explorer and rewrite tool.

## Development

The project uses Vite+ 0.2, Node.js 24, pnpm 10.33, Rust 1.94, and wasm-pack 0.15. Install [Vite+](https://viteplus.dev/guide/), install `wasm-pack`, then install the dependencies and start the app:

```sh
curl -fsSL https://vite.plus | bash
cargo install wasm-pack --version 0.15.0 --locked
vp install
vp run dev
```

The primary verification commands are:

```sh
vp run audit
vp run check
vp run test:contracts
vp run test:e2e
vp run build
```

The contract and E2E commands accept empty suites while the scaffold has no product behavior. Every future deployment remains gated on both commands.

Project documentation covers the [`architecture`](docs/architecture.md), [`product roadmap`](docs/roadmap.md), and [`deployment`](docs/deployment.md).

## License

SpiderSense is available under either the [MIT License](LICENSE-MIT) or the [Apache License 2.0](LICENSE-APACHE), at your option.
