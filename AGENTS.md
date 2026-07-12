# Working Agreement

SpiderSense uses test-driven agent development. Work follows this sequence:

1. **Plan and test:** Collaborate with the user to write a detailed `scratch/PLAN.md` and rigorous end-to-end tests for user-facing behavior. Do not write unit tests. Plans and tests must stand alone, including the reasoning behind design decisions. The user will generally start by describing desired functionality or changes, and possibly a high-level testing strategy. You will then think through the best testing approach for that functionality, considering the user's suggestions (but not necessarily adhering to them if you think there is a better strategy), and then you will suggest your plan to the user.
2. **Implement:** Only after the plan and tests are complete, iteratively and autonomously implement until all tests pass. Keep tests fixed during implementation unless the user agrees that the specification changed.
3. **Refactor:** With passing tests, review the whole change and aggressively simplify, remove code, and improve worthwhile abstractions while preserving behavior.
4. **Document:** Keep `docs/` clean and sufficient for a fresh agent to understand the architecture. Record confusion in `scratch/` and incorporate durable insights into the documentation. Describe the current design with positive assertions, without historical or negative framing.
5. **Clean up:** Rework changes into atomic revisions with useful descriptions focused on why. Remove ephemeral planning material so `scratch/` is generally empty when work is complete.

If a request departs from this workflow, point it out and suggest a TDD-aligned approach, while ultimately following the user's direction.

Manage version control exclusively with Jujutsu; never use Git commands that write to the repository. Before starting a change, create an empty `jj` revision described with its intent, then create an undescribed child revision. As work is completed, squash it into the described revision. The agent is responsible for this workflow and for maintaining clean revision history.
