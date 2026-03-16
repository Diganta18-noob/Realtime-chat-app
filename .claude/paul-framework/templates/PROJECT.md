# PROJECT.md Template

Template for `.paul/PROJECT.md` — the project's business context and requirements.

**Purpose:** Define what we're building, why it matters, and constraints. This is the "brief" that informs all planning.

---

## File Template

```markdown
# [Project Name]

## What This Is

[One paragraph describing what we're building. Be specific about the product/feature, not the technology.]

## Core Value

[Single sentence: What problem does this solve for whom? This is THE thing that matters.]

## Current State

| Attribute | Value |
|-----------|-------|
| Version | [current version] |
| Status | [Prototype / MVP / Beta / Production] |
| Last Updated | [YYYY-MM-DD] |

**Production URLs:** (if applicable)
- [URL 1]: [Description]
- [URL 2]: [Description]

## Requirements

### Validated (Shipped)

[Requirements that have been implemented and proven]

- [x] [Requirement 1] — [version shipped]
- [x] [Requirement 2] — [version shipped]
- [x] [Requirement 3] — [version shipped]

### Active (In Progress)

[Requirements currently being worked on]

- [ ] [Requirement 1] — [status/notes]
- [ ] [Requirement 2] — [status/notes]

### Planned (Next)

[Requirements queued for upcoming work]

- [ ] [Requirement 1]
- [ ] [Requirement 2]

### Out of Scope

[Explicitly excluded requirements — important for preventing scope creep]

- [Excluded feature 1] — [reason]
- [Excluded feature 2] — [reason]

## Target Users

**Primary:** [Who is the main user]
- [Key characteristic 1]
- [Key characteristic 2]
- [Their main goal/need]

**Secondary:** [Other users, if applicable]
- [Characteristics]

## Context

**Business Context:**
[Relevant business information — market, partners, strategy]

**Technical Context:**
[Relevant technical information — existing systems, integrations, constraints]

## Constraints

### Technical Constraints
- [Constraint 1: e.g., "Must run on Vercel serverless"]
- [Constraint 2: e.g., "Database must be PostgreSQL"]

### Business Constraints
- [Constraint 1: e.g., "No PII storage outside approved regions"]
- [Constraint 2: e.g., "Must integrate with existing CRM"]

### Compliance Constraints
- [Constraint 1: e.g., "GDPR data handling required"]
- [Constraint 2: e.g., "SOC 2 audit trail needed"]

## Key Decisions

| Decision | Rationale | Date | Status |
|----------|-----------|------|--------|
| [What was decided] | [Why] | [YYYY-MM-DD] | Active / Superseded |
| [Decision 2] | [Rationale] | [Date] | [Status] |

## Success Metrics

[How we know if this project succeeds — measurable outcomes]

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| [Metric 1] | [Target value] | [Current value] | [On track / At risk / Achieved] |
| [Metric 2] | [Target] | [Current] | [Status] |

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | [e.g., Laravel 11] | |
| Frontend | [e.g., Vue 3 + Inertia] | |
| Database | [e.g., PostgreSQL] | |
| Hosting | [e.g., Forge/Vapor] | |
| Auth | [e.g., Laravel Breeze] | |
| Payments | [e.g., Laravel Cashier] | |

## Links

| Resource | URL |
|----------|-----|
| Repository | [URL] |
| Production | [URL] |
| Staging | [URL] |
| Documentation | [URL] |

---
*PROJECT.md — Updated when requirements or context change*
*Last updated: [YYYY-MM-DD]*
```

---

## Section Specifications

### What This Is
**Purpose:** Concrete description of the product/feature.
**Length:** One paragraph.
**Focus:** What it is, not how it's built.

### Core Value
**Purpose:** The ONE thing that matters. Used to guide all decisions.
**Format:** Single sentence answering "What problem for whom?"
**Example:** "Attorneys can make informed accept/reject decisions on cases in under 2 minutes without reading raw documents."

### Requirements
**Purpose:** Track feature state across development.
**Categories:**
- **Validated:** Shipped and proven
- **Active:** Currently being implemented
- **Planned:** Queued for future
- **Out of Scope:** Explicitly excluded (prevents scope creep)

### Target Users
**Purpose:** Who we're building for.
**Include:** Characteristics, goals, needs.
**Why:** Prevents building for imaginary users.

### Constraints
**Purpose:** Hard limits on solutions.
**Categories:**
- Technical (platform, technology requirements)
- Business (partnerships, integrations, budget)
- Compliance (legal, regulatory, security)

### Key Decisions
**Purpose:** Record of significant decisions.
**Include:** What, why, when, status (Active/Superseded).
**Integration:** Can sync with decision-logger MCP.

### Success Metrics
**Purpose:** Measurable outcomes.
**Include:** Target values and current state.
**Why:** Objective success criteria prevent endless scope expansion.
