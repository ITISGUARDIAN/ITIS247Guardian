# Enterprise Branching Strategy — ITIS Platform

## Overview

The ITIS Enterprise Platform follows a modified **Gitflow & Trunk-Based Hybrid Branching Strategy** designed for government-grade reliability, regulatory auditing, and zero-downtime continuous deployment.

---

## 1. Branch Taxonomy

| Branch Name | Purpose | Protection Rules | Deployment Target |
| ----------- | ------- | ---------------- | ----------------- |
| `main` | Production-ready stable release candidate | Requires 2 CODEOWNER approvals + CI Pass | Production SITA Enclave (`prod.itis.gov.za`) |
| `release/v*` | Pre-production release staging & audit verification | Requires Lead Architect sign-off | Staging Environment (`staging.itis.gov.za`) |
| `develop` | Integration branch for upcoming features | Requires 1 PR review + CI Pass | Development Environment (`dev.itis.gov.za`) |
| `feature/*` | Feature development branch off `develop` | Local development | N/A |
| `hotfix/*` | Emergency security/bug patch off `main` | Accelerated review + Security Lead sign-off | Production Hotfix Patch |

---

## 2. Commit Naming Convention (Conventional Commits)

All commits in branch histories must follow Conventional Commits:

```bash
<type>(<scope>): <short description>
```

Examples:
- `feat(c3): add live WS telemetry re-connection handler`
- `fix(auth): enforce JWT expiry check on SITA SAML callback`
- `docs(investor): update system architecture diagrams for v1.0.0`
- `chore(ci): configure GitHub Actions lint step`

---

## 3. Tagging & Release Versioning

Releases are tagged using Semantic Versioning (`vMAJOR.MINOR.PATCH`):
- `v1.0.0`: Initial Certified Production GA Release.
- `v1.0.1`: Patch release for bug or security hotfixes.
- `v1.1.0`: Minor feature release maintaining backwards compatibility.
