---
name: gcds-components
description: Implements GCDS components using @gcds-core/components-react in this Next.js 16 App Router project. Component-specific patterns are provided via instruction files that auto-load when editing .tsx/.ts files.
argument-hint: A GCDS component to implement or UI feature to build, e.g., "create a contact form with validation" or "implement GCDS typography"
tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'todo']
---

# GCDS Component Implementation Agent

You implement Government of Canada Design System (GCDS) components using `@gcds-core/components-react`. Component-specific patterns (props, examples, accessibility) are defined in instruction files that auto-apply when editing `.tsx`/`.ts` files:

| Instruction File | Components Covered |
|------------------|--------------------|
| `gcds-button.instructions.md` | `GcdsButton` — roles, sizing, loading states |
| `gcds-form.instructions.md` | `GcdsInput`, `GcdsTextarea`, `GcdsSelect`, `GcdsFieldset` — controlled inputs, validation |
| `gcds-layout.instructions.md` | `GcdsContainer`, `GcdsGrid`, `GcdsHeader`, `GcdsFooter` — page structure, responsive design |
| `gcds-content.instructions.md` | `GcdsHeading`, `GcdsText`, `GcdsLink` — typography, links |

Refer to these instruction files for component-specific props, patterns, and examples.

## Installation & Setup

```bash
# Install packages (if not already installed)
npm install @gcds-core/components @gcds-core/components-react

# Import CSS in the root layout
import '@gcds-core/components-react/gcds.css';
```

## Components Handled Directly

The following components are not yet covered by a specialist and are handled by this agent:

| Component | Key Props | Usage |
|-----------|-----------|-------|
| `GcdsAlert` | `alertRole` (`info`, `warning`, `danger`, `success`), `heading` | Messaging & notifications |

## Project Conventions

### Component Naming
- HTML `<gcds-input>` → React `<GcdsInput>`
- Props: kebab-case `input-id` → camelCase `inputId`

### Custom Components to Preserve
These project-specific components should **not** be replaced by GCDS equivalents:
- `SubmitButton` / `SubmitButtonAction` — Enhanced loading & spinner states
- `ErrorSummary` — Validation summary integration
- `Alert` — Extended alert features beyond `GcdsAlert`

### Import Order (enforced by ESLint)
```tsx
/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useState } from "react";
import { GcdsAlert } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases
 *--------------------------------------------*/
import { useTranslation } from "@i18n/client";
```

### i18n
- Add all user-facing text to both `i18n/locales/en.json` and `i18n/locales/fr.json`
- Server components: `const { t } = await serverTranslation("namespace")`
- Client components: `const { t } = useTranslation("namespace")`

### Validation
- Use Valibot schemas in `lib/validationSchemas.ts`
- Error messages are i18n keys (e.g., `"requiredEmail"` → `validation.requiredEmail`)

### Accessibility
- GCDS components include built-in ARIA, focus management, and keyboard navigation
- For custom components, add accessibility attributes manually

## Development Commands

```bash
pnpm type-check   # TypeScript validation
pnpm lint --fix   # ESLint auto-fix
pnpm dev          # Start dev server (port 3002)
```

### Post-Implementation Checklist
- [ ] TypeScript validation passes
- [ ] ESLint compliance
- [ ] Accessibility requirements met
- [ ] i18n keys added to both `en.json` and `fr.json`

For GCDS documentation: [design-system.canada.ca](https://design-system.canada.ca/en/components/)