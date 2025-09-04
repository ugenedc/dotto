### GPT Coding Guide for Dotto

This document defines how code should be written, reviewed, and shipped in this repository. I (the assistant) will follow it whenever I create or modify code here.

---

## Purpose

- **Clarity first**: Code is for humans to read, then machines to run.
- **Functional by default**: Prefer pure functions and immutable data; isolate side effects.
- **Beautiful and consistent**: Consistent style and UI produce trust and speed.
- **Pragmatic best practices**: Adopt standards that reduce bugs and maintenance cost.

---

## Core Principles

- **Single responsibility**: Each function/module does one thing well.
- **Immutability**: Avoid in-place mutation; create new values.
- **Explicitness**: Prefer explicit types, names, and control flow over magic.
- **Composition over inheritance**: Build features by composing small parts.
- **Local reasoning**: Keep functions small so they fit in your head.
- **Fail fast, handle gracefully**: Validate inputs early; return rich errors.
- **No duplication**: DRY, but not at the cost of readability.
- **Measure, then optimize**: Use profiling/metrics before micro-optimizing.
- **Accessibility and inclusion**: Build for everyone by default.

---

## Functional Style Guidelines

- **Pure functions default**: No I/O, no shared state, same inputs ⇒ same outputs.
- **Side effects at boundaries**: Put I/O, network, storage, UI updates in thin adapters.
- **Data-in, data-out**: Prefer transforming plain data structures.
- **Avoid null/undefined**: Use explicit option/result types or safe defaults.
- **No hidden work**: Avoid global state, singletons, and implicit mutations.
- **Composition**: Prefer function composition and pipelines to deep nesting.
- **Error handling**: Return structured errors (Result/Either) over exceptions for expected cases.
- **Deterministic tests**: Pure logic must be trivial to test without mocks.

---

## Architecture

- **Layering**:
  - Domain (pure logic, no framework imports)
  - Application (use cases, services, orchestration)
  - Interface/Adapters (controllers, UI, gateways, DB, HTTP)
- **Dependency direction**: Outer layers depend on inner, never the reverse.
- **Dependency injection**: Pass collaborators as parameters; avoid new-ing inside logic.
- **Module boundaries**: Group by domain, not by technical layer when it helps cohesion.
- **State management**: Keep state local; lift only when necessary; centralize effects.

---

## Code Style (Language-Agnostic)

- **Naming**:
  - Functions: verbs/verb-phrases (`calculateTotal`, `fetchUserProfile`).
  - Variables: meaningful nouns (`pendingOrders`, `userIdToProfile`).
  - Avoid abbreviations and 1–2 character names.
- **Structure**:
  - Guard clauses; avoid deep nesting.
  - Keep functions ≤ 25–40 lines where reasonable.
  - Prefer expressions over statements when it improves clarity.
- **Types**:
  - Use strict typing where available. No `any` unless fully justified.
  - Model domain concepts with types, not comments.
- **Errors**:
  - Do not swallow errors. Either handle meaningfully or propagate with context.
  - Include actionable messages; avoid leaking sensitive data.
- **Comments & Docs**:
  - Document "why", not "what". Use docstrings for public APIs.
  - Avoid TODOs—implement or create a tracked issue.
- **Formatting**:
  - Use an auto-formatter. No subjective style debates in reviews.
  - Keep lines reasonably short and readable.

---

## UI/UX and Visual Quality

- **Design system**: Use a shared set of colors, spacing, radii, and typography.
- **Spacing rhythm**: 4/8 px scale (or platform-native scale) for margins/padding.
- **Typography**: Minimal type styles; consistent line-height and contrast.
- **Color**: Accessible contrast (WCAG 2.1 AA), dark mode if applicable.
- **States**: Define and implement hover/active/disabled/loading/empty/error states.
- **Responsiveness**: Layouts adapt gracefully (size classes/breakpoints).
- **Accessibility**: Labels, roles, focus order, keyboard navigation, dynamic type, VoiceOver.

---

## Testing Strategy

- **Pyramid**: Mostly unit tests (fast), some integration, few end-to-end.
- **Coverage targets**: Core business logic ≥ 80% lines/branches.
- **Unit tests**: Focus on pure functions; table-driven where useful.
- **Integration tests**: Exercise real boundaries (HTTP/DB) with test containers or fakes.
- **UI tests**: Snapshot plus behavior-driven interactions for critical flows.
- **Determinism**: No time/network flakiness; control time and randomness via injection.

---

## Performance & Reliability

- **Measure**: Use profiling and metrics; set budgets (cold start, TTI, memory).
- **Avoid needless work**: Memoize pure computations; virtualize lists; batch I/O.
- **Streaming/progressive**: Prefer incremental rendering/loading for large payloads.
- **Backoff and retries**: Exponential backoff for transient failures; circuit breakers.

---

## Security & Privacy

- **Secrets**: Never hardcode. Use environment/config vaults.
- **Input validation**: Validate and sanitize all external inputs.
- **Least privilege**: Scope tokens/permissions narrowly.
- **PII**: Minimize collection; redact in logs; comply with platform policies.
- **Dependencies**: Keep updated; audit for known vulnerabilities.

---

## Git, Branching, and Commits

- **Branching**: `feature/xyz`, `fix/bug-123`, `chore/…`.
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `chore:`, `revert:`.
- **Commit messages**: Imperative mood, short summary ≤ 72 chars, body with motivation.
- **Small PRs**: Prefer small, focused changes with tests.

---

## Pull Request Checklist (Reviewer & Author)

- [ ] Scope is single-purpose and minimal for the goal
- [ ] Public APIs are typed and documented
- [ ] Pure logic separated from side effects
- [ ] Inputs validated; errors handled with context
- [ ] Tests added/updated; coverage acceptable
- [ ] UI states covered (loading/empty/error)
- [ ] Accessibility verified (labels, focus, contrast)
- [ ] Performance considerations (no obvious N+1, excessive renders)
- [ ] Secrets and PII handled safely
- [ ] Changelog/README updated if needed

---

## Pre-Commit Checklist (Local)

- [ ] Lints and formatters pass with no warnings
- [ ] Type checker passes with no `any`/unsafe casts
- [ ] All tests green locally
- [ ] No unused code, dead branches, or commented-out blocks
- [ ] Log noise minimized; debug logs removed
- [ ] Names, comments, and messages are clear and professional

---

## Language/Stack-Specific Conventions

These apply when the stack is present; otherwise, ignore.

- **TypeScript/JavaScript**:
  - Strict mode on; no `any`. Use `unknown` + narrowing if needed.
  - Prefer `readonly` and immutable updates (`{ ...obj, x }`, spread, `immer`).
  - React/React Native: Functional components, hooks, no class components.
  - Memoization: `useMemo`, `useCallback` for stable references when measuring shows benefit.
  - State: Lift minimally; colocate logic; keep components small.
  - Testing: Vitest/Jest + React Testing Library patterns.

- **Swift/iOS**:
  - Swift 5+, SwiftLint. Value types (structs, enums) preferred.
  - SwiftUI where possible; unidirectional data flow; `ObservableObject` for effects.
  - Dependency injection via initializers/protocols; avoid singletons for logic.
  - Testing: XCTest, fast pure business logic tests, View inspection for states.

- **Kotlin/Android**:
  - Kotlinx immutable collections, data classes; coroutines + Flow; DI via Hilt/Koin.
  - Jetpack Compose; unidirectional data flow.

- **Backend (Node, Python, etc.)**:
  - 12-factor config; health checks; structured logs (JSON) with correlation IDs.
  - Validation at boundaries (HTTP/Queue/DB). Avoid throwing for control flow.

---

## Documentation

- **README updates**: Whenever behavior or usage changes.
- **API docs**: Docstrings for public types and functions; examples for complex flows.
- **Architecture notes**: Brief ADRs for significant decisions (context, options, decision, consequences).

---

## How I (the Assistant) Will Work Here

When implementing changes, I will:

1. Clarify requirements and edge cases.
2. Update or add tests for the desired behavior.
3. Write pure, composable functions; isolate side effects.
4. Use strict typing and clear names.
5. Ensure UI is accessible, responsive, and consistent with the design system.
6. Run formatters/linters and keep diffs focused.
7. Provide a concise summary of changes and their impact.

---

## Definition of Done

- [ ] Feature behavior implemented and verified against requirements
- [ ] Functional core with side effects isolated
- [ ] Tests cover happy path and key edge cases
- [ ] Lint, type check, and formatting clean
- [ ] UI/UX polished and accessible (if applicable)
- [ ] Docs/README/ADRs updated as needed
- [ ] Small PR with clear description and Conventional Commits

---

## Notes

If the project adopts a specific stack (e.g., Swift iOS app, React Native), this guide should be specialized further (tooling, scripts, linters). Until then, the above rules apply universally.


