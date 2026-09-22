# Flowroom: a better beginning

## The problem

Product designers need to go from an onboarding idea to a reviewable journey without switching between a prompt, a design file, a feedback thread, and a prototype. AI can make a first draft faster, but it introduces a new interaction problem: how can a designer understand, trust and own the generated starting point?

Flowroom focuses on that transition. The MVP supports a single three-screen onboarding workflow for a budgeting app named Bloom.

## Intended users

Product designers creating first-run experiences, frontend engineers translating design systems into working components, and teammates reviewing copy or confusing interactions.

## Layout reasoning

An early structural wireframe divides the experience into three predictable areas:

```
┌───────────────────── Project / save state / share / preview ────────────────────┐
│ Navigation       │                                                           │
│                  │                Connected screen canvas     Properties     │
│ Screen order     │                01 → 02 → 03                 Content        │
│ Component library│                                            Appearance     │
│ Comments         │                                            Feedback       │
│ Generate         │                Selection / undo / zoom                     │
└──────────────────┴───────────────────────────────────────────────────────────┘
```

The left rail provides stable structure and ordering. The central canvas keeps the whole journey visible. The right panel changes with the selected screen, so edits have an immediate visible result. On narrow displays the properties panel moves below the canvas, while the navigation becomes a drawer.

## Visual direction

A charcoal workspace rail anchors the interface. A light dotted canvas suggests an open design surface without introducing unrestricted positioning. Warm orange selection and primary actions make the editable focus clear; olive tones belong to Bloom's budgeting-app screens. The sample balance chart is UI data visualization, not a static screen image.

| Token | Value | Role |
|---|---|---|
| Workspace | `#232626` | Navigation rail |
| Canvas | `#F8F9F6` | Working surface |
| Primary | `#D97958` | Main editor actions |
| Bloom accent | `#DA7454` | Onboarding buttons |
| Text | `#292C2D` | Editor text |
| Radius | 10px default | Shared UI surfaces |

Buttons have hover, keyboard focus, disabled and loading states. Screens have selection outlines and corner handles. Generation, persistence and feedback expose loading, failure and completion messages. Reduced-motion mode removes animations.

## From generation to human refinement

1. **Brief:** The designer describes the intended onboarding.
2. **Generate:** A server endpoint returns validated definitions for welcome, profile and preferences templates.
3. **Review:** A separate result state lists the proposed screens. Generating never immediately replaces the existing work.
4. **Apply:** The designer explicitly replaces the flow, and undo preserves the prior version.
5. **Refine:** Copy and appearance remain ordinary editable properties; generated output has no privileged status.
6. **Review together:** Screen-linked comments keep feedback in context. Live screen presence shows where other sessions are working.
7. **Test:** The interactive preview enforces meaningful form validation and supports a complete journey.

When an AI key is absent, the UI discloses template mode. This preserves a useful demo without implying a live model was called.

## Engineering decisions

Structured data renders through React components; generated code is never evaluated. Zod validates incoming screen definitions. D1 stores the flow and comments, and optimistic version checks avoid silently replacing another editor's changes. Polling is a deliberately simple collaboration transport for this MVP. A production team workspace would benefit from Liveblocks presence and CRDT state, verified identities, and explicit project permissions.

## Usability study plan — not completed research

No participant sessions have been conducted. The following is a plan, not findings:

- Recruit three to five product designers or frontend engineers.
- Ask each to generate a starting point, change the welcome headline, reorder two screens, leave a contextual comment and complete the preview.
- Observe whether they understand that generation is staged before replacement.
- Record time to first useful edit, accidental replacements, missed comments, form-validation confusion and ability to recover with undo.
- Ask them to explain the difference between generated content and reusable components.
- Revise the product from observed issues, then record the actual changes and evidence here.

## Suggested 60-second demo

- 0–10s: Introduce the three-screen canvas and Bloom's onboarding.
- 10–25s: Open the brief, generate, review, and apply a starting point.
- 25–35s: Edit a heading and accent color directly in properties.
- 35–45s: Open a second session, leave a comment and resolve it.
- 45–60s: Preview the journey, trigger then correct a validation error, and finish onboarding.

The strongest portfolio story is the deliberate handoff from a generated suggestion to a designer-owned, testable product flow. Add real usability evidence before presenting it as a validated design outcome.
