Project: learn-next-v1 — Copilot instructions for contributors and AI agents

Purpose
- Brief guidance to help AI coding agents be immediately productive in this Next.js + TypeScript codebase.

Big picture
- App type: Next.js (App Router) React app — entry at [app/layout.tsx](app/layout.tsx#L1).
- UI is component-driven: reusable UI components live in [app/components/ui](app/components/ui).
- Dynamic page rendering: a simple component registry maps block `type` to React components in [app/components/registry.ts](app/components/registry.ts#L1).
- Runtime flow: pages supply `blocks` + `schemaMap` → [app/components/PageRendered.tsx](app/components/PageRendered.tsx#L1) picks a component from the registry, validates props with [app/components/editor/validateProps.ts](app/components/editor/validateProps.ts#L1), then renders the component.

Key files & responsibilities
- [package.json](package.json#L1): standard scripts: `dev`, `build`, `start`, `lint`.
- [app/layout.tsx](app/layout.tsx#L1): global layout, fonts and global CSS.
- [app/components/registry.ts](app/components/registry.ts#L1): central mapping of block `type` to component (e.g., `hero`, `card`, `button`). When adding a new block type, register it here.
- [app/components/PageRendered.tsx](app/components/PageRendered.tsx#L1): example of how blocks, schemas and validation are wired together. Follow this pattern for additional block types.
- [app/components/editor/PropsEditor.tsx](app/components/editor/PropsEditor.tsx#L1): client-side editor UI for editing component props; uses a small `Field` schema shape.
- [app/components/editor/schemas/*.ts](app/components/editor/schemas#L1): canonical schema examples (`button.schema.ts`, `card.schema.ts`, `hero.schema.ts`). Use `defaultValue` fields and `select` `options` as shown.

Patterns & conventions (project-specific)
- Schema-first props: every block type has a `Record<string, Field>` schema used by `PropsEditor` and `validateProps`. Field types are `'text' | 'color' | 'select'` (see [PropsEditor.tsx](app/components/editor/PropsEditor.tsx#L1)).
- Validation rules in code: `validateProps` enforces defaults and valid `select` values; prefer using this function rather than reimplementing validation.
- Registry-driven rendering: do not import components directly into pages — use the registry and block/type pattern so editors and renderers stay decoupled. When you add a component, export it into `app/components/ui` and add it to [registry.ts](app/components/registry.ts#L1).
- Client vs server components: editor UI uses `'use client'` (see `PropsEditor.tsx`); most UI components are standard React components and will render client-side when props require interactivity.

Developer workflows & commands
- Start dev server: `npm run dev` (see [package.json](package.json#L1)).
- Build for production: `npm run build` then `npm run start`.
- Linting: `npm run lint` (ESLint configured via `eslint.config.mjs`).

Change guidance & examples
- Adding a new block type (concise steps):
  1. Create UI component in app/components/ui/MyComponent.tsx.
  2. Provide a schema in app/components/editor/schemas/mycomponent.schema.ts matching `Field`.
  3. Register the component in [app/components/registry.ts](app/components/registry.ts#L1) using the block `type` key.
  4. Ensure `PageRendered` will receive the matching schema name in `schemaMap` so `validateProps` and `PropsEditor` work.

What to avoid
- Don’t bypass the registry for rendering blocks; this breaks the editor/render split.
- Don’t change schema field names without updating the corresponding UI and `validateProps` logic.

Notes for AI agents
- Use the registry + schema pattern as the primary integration point when adding or editing UI blocks.
- For prop changes, update `app/components/editor/schemas/*` and `validateProps` when necessary.
- Prefer minimal, atomic edits and include tests or manual verification steps in PR descriptions (e.g., run `npm run dev` and visit `http://localhost:3000`).

If anything above is unclear or you want more examples (e.g., a new block scaffold), tell me which part to expand.
