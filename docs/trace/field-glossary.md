# Trace Field Glossary (v1)

## Producer

- `producerId`: Stable producer identifier.
- `legalName`: Legal organization name.
- `countryCode`: ISO 3166-1 alpha-2.
- `region`: Optional production region.
- `organizationWallet`: EVM wallet for organization-level control.

## Batch

- `batchId`: Stable batch/passport identifier.
- `producerId`: FK reference to producer.
- `productType`: Commodity class.
- `varietalOrSubtype`: Product subtype.
- `vineyardOrFarmLocation`: Origin location text.
- `harvestDate`: ISO date.
- `schemaVersion`: Schema version marker.

## Issuer

- `issuerId`: Stable issuer identifier.
- `organizationName`: Issuer legal/operational name.
- `walletAddress`: Issuer wallet.
- `roles`: Claim roles (issuer authority classes).
- `trusted`: Trust flag in governance model.

## Trace Event

- `eventId`: Stable event identifier.
- `batchId`: Associated batch.
- `eventType`: Lifecycle event enum.
- `issuerId`: Issuer making claim.
- `timestamp`: ISO date-time.
- `payload`: Structured event payload.
- `documentRefs`: Linked evidence pointers.
- `prevEventHash`: Optional chain-of-custody hash link.
- `signature`: Signature payload.

## Verification Result

- `verifiedAt`: Evaluation timestamp.
- `completeLifecycle`: Lifecycle completeness boolean.
- `trustedIssuersOnly`: All issuers trusted.
- `signaturesValid`: Signature checks passed.
- `hashesConsistent`: Integrity checks passed.
- `chainAnchoringStatus`: Anchoring state.
- `notes`: Human-readable diagnostics.
