# Security and Reliability

## Security Controls

- Principle of least privilege for runtime and data access
- Secret rotation policy with deployment-safe sequencing
- Input validation and strict schema boundary enforcement

## Reliability Engineering

- Define service-level objectives per critical path
- Track error budget burn and change failure rate
- Prefer graceful degradation over hard failure where feasible

## Failure Testing

- Inject dependency failures in staging verification
- Rehearse rollback for high-risk release categories
- Validate backup and restore paths on schedule

## Decision Framework

- Security and reliability choices are evaluated by blast radius, detectability, reversibility, and operator burden
