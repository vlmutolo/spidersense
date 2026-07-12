# Architecture

SpiderSense is a SvelteKit application deployed to Cloudflare Workers. Svelte renders the application shell and owns transient interface state such as selection, keyboard mode, viewport, and panels. The initial diagram renderer uses native SVG and plain CSS.

Vite+ manages the Node.js runtime, delegates package installation to the pinned pnpm version, and supplies Vite, Vitest, Oxlint, Oxfmt, and the task runner. Project tasks compose those tools with Svelte checks and the Rust/Wasm toolchain through the `vp` command surface.

The Cargo workspace separates the platform-independent engine from its browser adapter:

- `spidersense-core` owns the canonical ZX diagram, grouping model, and rewrite algorithms.
- `spidersense-wasm` exposes coarse-grained browser operations through `wasm-bindgen`.
- `src/lib/engine.ts` loads the generated WebAssembly module lazily on the client.

Generated WebAssembly bindings live in `src/lib/wasm/` and are rebuilt by the package scripts. They remain outside revision control.

SvelteKit retains server rendering and prerendering capabilities for the application shell. Browser-only editor behavior initializes after hydration. Cloudflare's SvelteKit adapter supplies the Worker runtime and leaves server endpoints available for future hosted capabilities.
