# ADR-002: Queue-First Ingestion for Bursty Traffic

- Status: Accepted
- Date: 2026-03-01
- Owners: Data Platform

## Context

Direct write paths to processors failed to absorb burst traffic safely and increased drop risk.

## Decision

Introduce durable queue-first ingestion with idempotent consumers and replay tooling.

## Consequences

- Positive: stronger resilience under burst traffic
- Positive: safer deployment of processors via buffered decoupling
- Negative: increased freshness delay for downstream analytics

## Implementation Notes

- Event envelope contract and schema validation
- Consumer offset checkpoints
- Replay procedures by event time window
