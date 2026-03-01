# Data Patterns

## D1 Schema and Migration Discipline

- Use additive schema changes as default path
- Gate destructive migrations behind explicit operational windows
- Version schema changes with application rollout sequence

## Data Integrity Patterns

- Enforce idempotent writes for retry-safe operations
- Use conflict-aware upserts for high-contention entities
- Maintain reconciliation jobs for eventual consistency domains

## Recovery and Continuity

- Maintain backup and restore runbooks with regular test restores
- Keep replay-compatible event history for critical domains
- Document recovery time objectives by system tier

## Data Access Practices

- Bound query complexity in request-path workloads
- Segment analytical workloads from operational hot paths
- Capture slow query traces and fold into design iteration
