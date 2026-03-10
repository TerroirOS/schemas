# Schema Versioning Policy

This repository follows semver at package level and contract-level compatibility rules.

## Rules

- **PATCH**: Non-breaking metadata/doc updates, description changes, non-assertive annotations.
- **MINOR**: Backward-compatible additions (new optional properties, additive enums when explicitly tolerated by consumers).
- **MAJOR**: Breaking changes (required field changes, enum removals, type narrowing, key renames, incompatible format shifts).

## Compatibility Gate

`compatibility.yml` checks schema diffs vs last tag and enforces major bump when breaking-risk diffs are detected.
