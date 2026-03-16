<principles>
Core principles for the PAUL development workflow.

<solo_developer_claude>

You are planning for ONE person (the user) and ONE implementer (Claude).
- No teams, stakeholders, ceremonies, coordination overhead
- User is the visionary/product owner
- Claude is the builder
- Estimate effort in context usage, not human dev time
</solo_developer_claude>

<plans_are_prompts>

PLAN.md is not a document that gets transformed into a prompt.
PLAN.md IS the prompt. It contains:
- Objective (what and why)
- Context (@file references)
- Acceptance Criteria (measurable outcomes)
- Tasks (with verification criteria)
- Boundaries (explicit scope control)

When planning, you are writing the prompt that will execute it.
</plans_are_prompts>

<loop_first>

Every PLAN must complete the full loop:

```
PLAN ──▶ APPLY ──▶ UNIFY
```

- **PLAN:** Design, get approval, set boundaries
- **APPLY:** Execute tasks, commit per-task
- **UNIFY:** Reconcile plan vs actual, update STATE.md

Never leave a loop incomplete. UNIFY closes the loop and updates state.
This creates audit trail and enables proper session handoff.
</loop_first>

<acceptance_driven>

Acceptance criteria are first-class, not afterthoughts.

Every PLAN.md has an `## Acceptance Criteria` section with:
- AC-1, AC-2, AC-3... numbered criteria
- Each AC is testable/verifiable
- SUMMARY.md maps results to AC numbers

Format: `AC-N: [Measurable, observable outcome]`

This enables:
- Clear completion signals
- Objective verification
- Deviation tracking against defined scope
</acceptance_driven>

<scope_control>

Plans must complete within reasonable context usage.

**Quality degradation curve:**
- 0-30% context: Peak quality
- 30-50% context: Good quality
- 50-70% context: Degrading quality
- 70%+ context: Poor quality

**Solution:** Aggressive atomicity - split into small, focused plans.
- 2-3 tasks per plan maximum
- Each plan independently executable
- Target ~50% context per plan (40% for TDD plans)
</scope_control>

<claude_automates>

If Claude CAN do it via CLI/API/tool, Claude MUST do it.

Checkpoints are for:
- **Verification** - Human confirms Claude's work (visual, UX)
- **Decision** - Human makes implementation choice

Not for:
- Deploying (use CLI)
- Creating resources (use CLI/API)
- Running builds/tests (use Bash)
- Writing files (use Write tool)
</claude_automates>

<deviation_rules>

Plans are guides, not straitjackets. During APPLY:

1. **Auto-fix bugs** - Fix immediately, log in SUMMARY
2. **Auto-add critical** - Security/correctness gaps, add immediately
3. **Auto-fix blockers** - Can't proceed, fix immediately
4. **Ask about architectural** - Major changes, stop and ask
5. **Log enhancements** - Nice-to-haves, log to deferred issues

All deviations logged during UNIFY for audit trail.
</deviation_rules>

<ship_fast>

No enterprise process. No approval gates beyond PLAN approval.

Plan → Execute → Ship → Learn → Repeat

Milestones mark shipped versions (v0.1 → v0.2 → v1.0).
Decimal phases (8.5) for urgent interruptions.
</ship_fast>

<anti_enterprise>

NEVER include:
- Team structures, RACI matrices
- Stakeholder management
- Sprint ceremonies
- Human dev time estimates (hours, days, weeks)
- Change management processes
- Documentation for documentation's sake

If it sounds like corporate PM theater, delete it.
</anti_enterprise>

</principles>
