//! Platform-independent ZX calculus model and rewrite engine.

#![forbid(unsafe_code)]

/// Version of the engine interface exposed to platform adapters.
pub const VERSION: &str = env!("CARGO_PKG_VERSION");
