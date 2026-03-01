# Postmortem: Deployment Race Condition in Policy Rollout

- Date: 2026-03-01
- Severity: SEV-2
- Status: Resolved

## Summary

A rollout race condition caused a subset of edge nodes to fetch mixed policy versions, producing inconsistent routing outcomes for a limited tenant group.

## Impact

- Intermittent routing inconsistency for affected tenants
- Temporary increase in support escalations
- No data integrity loss observed

## Root Cause

Version publish and activation were not atomically coordinated across two deployment steps.

## Detection

Synthetic route validation detected divergence between expected and observed policy behavior during rollout.

## Resolution

- Paused rollout and reverted active policy version
- Introduced atomic activation transaction
- Added rollout checkpoint verification before next-stage progression

## Preventive Actions

1. Add invariant checks for version activation state
2. Expand canary sampling by tenant policy complexity
3. Enforce publish-activation coupling in release tooling
