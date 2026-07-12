//! Browser-facing WebAssembly adapter for the core engine.

#![forbid(unsafe_code)]

use wasm_bindgen::prelude::*;

/// Reports the linked core version so consumers can verify that Wasm loaded.
#[wasm_bindgen]
pub fn engine_version() -> String {
    spidersense_core::VERSION.to_owned()
}
