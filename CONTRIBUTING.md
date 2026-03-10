# Contributing

## Principles

- Keep JSON Schema as canonical source for machine-readable contracts.
- Keep SQL and application adapters aligned with canonical schemas.
- Use semver discipline for all schema changes.

## Change Workflow

1. Update schemas under `schemas/trace/v1`.
2. Update adapter code under `packages/schemas/src` if needed.
3. Run:

```bash
npm run ci
```

4. If a change may be breaking, bump major version in `packages/schemas/package.json`.
5. Update `CHANGELOG.md`.

## Commit Guidance

- Use clear commit messages that include scope, e.g. `schemas(trace): add optional field x`.
- Avoid mixing unrelated schema and tooling changes in one commit.
