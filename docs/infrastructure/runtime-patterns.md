# Runtime Patterns

## Edge Runtime Strategy

- Use edge execution where request-path latency is critical
- Keep request handlers deterministic and side-effect boundaries explicit
- Isolate control-plane reads from mutable write paths

## Service Boundary Design

- Separate request orchestration from domain mutation logic
- Keep interfaces contract-first and versioned
- Use explicit fallback paths for dependency degradation

## Performance Controls

- Budget p95 latency per component and enforce in CI checks
- Cache by stability class (immutable, soft-stale, volatile)
- Track tail-latency regressions per release fingerprint

## Scaling Model

- Scale stateless processing first
- Move burst absorption to durable queues
- Tune concurrency against downstream saturation points
