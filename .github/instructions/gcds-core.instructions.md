---
description: 'Core GCDS integration patterns and project-specific conventions for @gcds-core/components-react'
applyTo: '**/*.tsx, **/*.ts'
---

# GCDS Core Integration Guide

This file contains project-specific conventions for integrating Government of Canada Design System (GCDS) components. For component-specific documentation (props, examples), the agent will fetch current information from design-system.canada.ca.

## Installation & Setup

```bash
# Install packages (if not already installed)
npm install @gcds-core/components @gcds-core/components-react

# Import CSS in the root layout
import '@gcds-core/components-react/gcds.css';
```

## Project-Specific Conventions

### Custom Components to Preserve
These project-specific components should **NOT** be replaced by GCDS equivalents:
- `SubmitButton` / `SubmitButtonAction` — Enhanced loading states and spinner integration
- `ErrorSummary` — Validation summary integration  
- `Alert` — Extended alert features beyond `GcdsAlert`
- Icon components in `components/icons/` — Project-specific icons and branding

### Component Naming & Props
- HTML `<gcds-input>` → React `<GcdsInput>`
- Props: kebab-case `input-id` → camelCase `inputId`
- Always use proper TypeScript typing for GCDS component props

### Import Order (Enforced by ESLint)
Required group order with standardized section comments:

```tsx
/*--------------------------------------------*
 * Framework and Third-Party
 *--------------------------------------------*/
import { useState } from "react";
import { GcdsButton, GcdsInput } from "@gcds-core/components-react";

/*--------------------------------------------*
 * Internal Aliases  
 *--------------------------------------------*/
import { useTranslation } from "@i18n/client";
import { logMessage } from "@lib/logger";
```

Groups: React/Next/third-party → Project aliases (`@root`, `@lib`, `@i18n`, `@components`) → Parent relative (`../`) → Local relative (`./`) → Styles (`.css`, `.scss`)

### i18n Integration
- **Server components**: `const { t } = await serverTranslation("namespace")`
- **Client components**: `const { t } = useTranslation("namespace")`
- Add all user-facing text to both `i18n/locales/en.json` and `i18n/locales/fr.json`
- Use i18n keys for GCDS component labels, hints, and error messages:

```tsx
<GcdsInput
  label={t("email.label")}
  hint={t("email.hint")}
  errorMessage={errors.email ? t(`validation.${errors.email}`) : undefined}
/>
```

### Form Handling & Validation
- Use **Valibot schemas** in `lib/validationSchemas.ts`
- Error messages are i18n keys: `v.minLength(1, "requiredEmail")` → `validation.requiredEmail`
- Client components use `useActionState` for form handling:

```tsx
const [state, formAction] = useActionState(localFormAction, { validationErrors: undefined });
```

- GCDS form components use controlled inputs:

```tsx
<GcdsInput
  value={formData.email}
  onInput={(e) => setFormValue('email', (e.target as HTMLInputElement).value)}
  errorMessage={getError('email')}
/>
```

### Component Placement Rules
- **Route-only usage**: colocate under that route's `components` folder
- **Reused across routes**: place under `@components/*` in closest matching domain folder
- **True primitives only**: default to `@components/ui/*`

## React 19 + Compiler Considerations

### Do NOT Use These Hooks
- **No `useCallback`**: React Compiler handles memoization automatically
- **No `useMemo`**: React Compiler optimizes dependencies implicitly

### Recommended Patterns
- Use functional components with hooks as primary pattern
- Implement component composition over inheritance
- Use custom hooks for reusable stateful logic
- Implement Error Boundaries for component-level error handling

## Styling & Design Tokens

### Tailwind CSS Integration
- **Class ordering**: Enforced by `eslint-plugin-tailwindcss` (auto-fixable)
- **GCDS Tokens**: Available under `gcds` namespace:
  - Colors: `gcds-blue-{50-900}`, `gcds-grayscale-{50-900}`, etc.
  - Spacing: Integrated into Tailwind's spacing scale
- **Custom classes**: `gc-*` prefix classes are whitelisted

```tsx
// ✅ Good - Using GCDS tokens
<div className="bg-gcds-blue-900 text-gcds-grayscale-50 p-400">
```

### When to Use GCDS vs Custom Components

**Use GCDS components for:**
- Standard form inputs (`GcdsInput`, `GcdsTextarea`, `GcdsSelect`)
- Typography (`GcdsHeading`, `GcdsText`, `GcdsLink`)
- Layout structure (`GcdsContainer`, `GcdsGrid`)
- Standard buttons for basic interactions
- Official header/footer (`GcdsHeader`, `GcdsFooter`)

**Keep custom components when:**
- Enhanced functionality needed (loading states, complex validation)
- Project-specific branding or design requirements
- Multi-state buttons with custom logic
- Components not available in GCDS

## Accessibility & Standards
- GCDS components include built-in ARIA, focus management, and keyboard navigation
- For custom components, manually add accessibility attributes
- Follow semantic HTML patterns with GCDS components
- Test with screen readers and ensure keyboard navigation works

## GCDS Agent Implementation Rules

### Critical Implementation Guidelines
1. **Use Only Official GCDS Components**: Never create custom components that mimic GCDS functionality. Import and use actual GCDS components from `@gcds-core/components-react` only.

2. **Mandatory Page Structure**: Every page MUST include:
   - `GcdsHeader` component (with proper language toggle)
   - `GcdsFooter` component  
   - Proper semantic page structure with main content area

```tsx
import { GcdsHeader, GcdsFooter } from '@gcds-core/components-react';

export default function PageLayout({ children }) {
  return (
    <>
      <GcdsHeader langHref="/fr" skipToHref="#main-content">
        {/* Optional header content */}
      </GcdsHeader>
      
      <main id="main-content">
        {children}
      </main>
      
      <GcdsFooter display="compact" langHref="/fr" />
    </>
  );
}
```

3. **Test-Driven Implementation**: After any GCDS component implementation:
   - Run `pnpm test` to validate the implementation
   - If tests fail, analyze failures and iterate on the implementation
   - Continue iterating until all tests pass
   - Never consider implementation complete until tests are green

### Development Commands
```bash
# Required after every implementation
pnpm test                    # Run full test suite
pnpm type-check             # Ensure TypeScript compliance  
pnpm lint --fix             # ESLint auto-fix (includes import order and Tailwind class order)
pnpm dev                     # Start dev server (port 3002)
```

## Dynamic Component Documentation
For specific component props, usage examples, and latest API documentation, the agent should fetch current information from:
- Primary: https://design-system.canada.ca/en/components/
- Fallback: GitHub repository documentation

This ensures always up-to-date component information without maintaining multiple instruction files.