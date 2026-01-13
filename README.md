# Design System Components

This repository contains a shared Angular component library used across multiple apps (e.g., toneTapp, product demo app).

## Structure
Components are organized by folder under `shared/design-systems/components`, each with `*.component.ts/html/css`, a local `README.md`, and an `index.ts` for exports.

## Using in Apps
- Option A: Add as a Git submodule and reference via TypeScript path aliases.
- Option B: Copy/sync specific components into your Angular app.
- Option C: Migrate to an Angular workspace library (`ng generate library`) to publish/use via npm.

## Development
- Create or update components under their folder.
- Keep `index.ts` exports up-to-date.
- Commit and push changes to share updates across projects.

## Next Steps
If you want this to be an installable package, we can scaffold an Angular library wrapper and wire these components into it.
