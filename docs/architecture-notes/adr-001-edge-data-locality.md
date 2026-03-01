# ADR-001: Edge Data Locality Strategy

- Status: Accepted
- Date: 2026-03-01
- Owners: Platform Engineering

## Context

Global request patterns showed high latency variance due to centralized data lookups in request-path operations.

## Decision

Adopt edge-local read models with asynchronous origin reconciliation for selected low-risk read domains.

## Consequences

- Positive: lower p95 read latency and better regional responsiveness
- Positive: reduced origin pressure during traffic surges
- Negative: bounded staleness risk that requires clear freshness contracts

## Implementation Notes

- Versioned read snapshots
- Reconciliation jobs with drift alerts
- Fallback to origin for strict-consistency endpoints
