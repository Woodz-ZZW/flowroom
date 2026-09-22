# Flowroom

A shared workspace for designing and testing onboarding flows.

**Focus:** Product design, frontend development, and reusable UI components.

## The problem

Designers often switch between tools to create screens, collect feedback, and test a user journey. Flowroom brings these tasks into one workspace.

## The solution

The demo follows Bloom, a budgeting app, through three screens: welcome, profile setup, and preferences. Teams can edit the flow, leave comments, and try the experience before building the full product.

## Key features

- Add, reorder, and edit screens on a visual canvas.
- Change text, colors, spacing, and button styles.
- Save shared edits and leave feedback on specific screens.
- Test mobile and desktop previews with form validation.
- Generate a starting point, review it, and apply it when ready.

## Design choices

Screen navigation sits on the left, the journey stays visible in the center, and editing controls sit on the right. Reusable components keep screens consistent. Keyboard shortcuts, clear focus states, and reduced-motion support make the editor easier to use.

The main design idea is simple: generation gives designers a starting point, while review, editing, and undo keep them in control.

## Current result

A working local demo built with React, TypeScript, Tailwind CSS, Radix UI, and Cloudflare D1. Build, type, and API checks pass.

Generation currently uses templates; live AI needs an API key. Shared updates refresh every few seconds. The next step is testing with designers and improving the flow from their feedback.
