/** Lazily initializes the browser's Rust engine. */
export async function loadEngine() {
	const engine = await import('$lib/wasm/spidersense_wasm.js');
	await engine.default();
	return engine;
}
