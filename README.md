# Terroir Schemas

Canonical schema repository for Terroir data contracts.

This repository is **Trace-first** in v1 and provides:

- JSON Schema (Draft 2020-12) canonical contracts
- TypeScript types and Zod validators (`@terroiros/schemas`)
- Canonical SQL artifacts aligned to Trace persistence
- Versioning and compatibility policy for schema evolution

## Repository Layout

- `schemas/trace/v1/*.schema.json` - canonical Trace JSON Schemas
- `schemas/shield/README.md` - Shield placeholder contract (not stabilized)
- `schemas/watch/README.md` - Watch placeholder contract (not stabilized)
- `sql/trace/v1/*` - canonical SQL schema files for Trace
- `packages/schemas` - npm package (`@terroiros/schemas`)
- `examples/trace/*` - example payloads for validation tests
- `docs/*` - glossary and versioning policy

## Quick Start

```bash
npm install
npm run ci
```

## npm Package

Published package: `@terroiros/schemas`

Example usage:

```ts
import { traceEventSchema } from "@terroiros/schemas";
import traceEventJsonSchema from "@terroiros/schemas/trace/v1/trace-event.schema.json";
```

## Versioning Policy

- patch: non-breaking clarifications / metadata updates
- minor: additive backward-compatible changes
- major: breaking changes (required fields, enum removals, type narrowing)

See `docs/versioning-policy.md` for full rules.
