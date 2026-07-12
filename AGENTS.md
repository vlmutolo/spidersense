# Working Agreement

SpiderSense uses test-driven agent development. Work follows this sequence:

1. **Plan and test:** Collaborate with the user to define and confirm the important module interfaces, user-facing behavior, and the tests that prove those contracts. Record the result in a detailed `scratch/PLAN.md`, then write the tests. Plans and tests must stand alone, including the reasoning behind design decisions. Keep code modular and give every module end-to-end contract tests through its public interface rather than unit tests of private implementation details. Use property-based generators and shrinking rather than handwritten example cases. GUI tests prioritize observable logic and state transitions. Assert visual details when they are explicit product behavior, while avoiding brittle assertions about layout, typography, or exact pixel geometry.
2. **Implement:** Only after the plan and tests are complete, iteratively and autonomously implement until all tests pass. Keep tests fixed during implementation unless the user agrees that the specification changed.
3. **Refactor:** With passing tests, review the whole change and aggressively simplify, remove code, and improve worthwhile abstractions while preserving behavior.
4. **Document:** Keep `docs/` clean and sufficient for a fresh agent to understand the architecture. Record confusion in `scratch/` and incorporate durable insights into the documentation. Describe the current design with positive assertions, without historical or negative framing.
5. **Clean up:** Rework changes into atomic revisions with useful descriptions focused on why. Remove ephemeral planning material so `scratch/` is generally empty when work is complete.

If a request departs from this workflow, point it out and suggest a TDD-aligned approach, while ultimately following the user's direction.

Use `proptest` in Rust integration-test targets and `fast-check` with Vitest or Playwright for TypeScript and browser contracts. Model stateful behavior with generated commands and a small, declarative test-side reference model that is independent of the production implementation. Every browser trial and shrink attempt starts from a clean page, drives the real application and real Wasm implementation, and has no behavioral fallback that could mask integration failures.

Represent every agreed behavior at the narrowest important public interface and again through the rendered application when it is user-facing. Property failures must report enough seed and shrink information to reproduce them. Preserve discovered regressions through the property library's reproducibility mechanism rather than handwritten example cases; use larger stress runs when useful without changing the properties exercised in normal CI.

Define strongly typed Rust errors with `thiserror`.

Use Vite+ (`vp`) as the web toolchain and command entry point. Define project workflows as Vite Task entries in `vite.config.ts`; pnpm remains the package manager behind Vite+.

Manage version control exclusively with Jujutsu; never use Git commands that write to the repository. Before starting a change, create an empty `jj` revision described with its intent, then create an undescribed child revision. As work is completed, squash it into the described revision. The agent is responsible for this workflow and for maintaining clean revision history.

Treat each described revision as a feature branch. For unrelated concurrent work, create sibling described revisions from the same parent, develop each through its own undescribed child, then rebase the revisions into a linear history before completion.
