---
description: 'GCDS button component patterns and usage guidelines for @gcds-core/components-react'
applyTo: '**/*.tsx, **/*.ts'
---

# GCDS Button Components

Use the `GcdsButton` component from `@gcds-core/components-react` for standard button interactions.

## GcdsButton

**Import**: `import { GcdsButton } from '@gcds-core/components-react';`

**Props:**
- `buttonRole`: `primary` | `secondary` | `destructive` | `skip-to-nav`
- `buttonId`: Unique identifier
- `size`: `small` | `regular` | `large`
- `disabled`: Boolean
- `type`: `button` | `submit` | `reset`

**Usage:**
```tsx
<GcdsButton buttonRole="primary" type="submit">
  {t("submit")}
</GcdsButton>

<GcdsButton buttonRole="secondary" onClick={handleCancel}>
  {t("cancel")}
</GcdsButton>

<GcdsButton buttonRole="destructive" onClick={handleDelete}>
  {t("delete")}
</GcdsButton>
```

## When to Use vs Custom Buttons

**Use GcdsButton for:**
- Standard form submissions
- Navigation actions
- Standard interactions (save, cancel, edit, delete)
- Call-to-action elements

**Keep custom components for:**
- `SubmitButton` / `SubmitButtonAction` — Enhanced loading states and spinner integration
- Icon-only buttons where GCDS doesn't provide needed patterns
- Multi-state buttons with custom logic

## Patterns

### Form with Mixed Buttons
```tsx
<div className="flex gap-4">
  <GcdsButton buttonRole="secondary" type="button">
    {t("cancel")}
  </GcdsButton>
  <SubmitButtonAction buttonRole="primary">
    {t("submit")}
  </SubmitButtonAction>
</div>
```

### Button Groups
```tsx
<div className="flex flex-col sm:flex-row gap-3">
  <GcdsButton buttonRole="primary" onClick={handlePrimary}>{t("primary")}</GcdsButton>
  <GcdsButton buttonRole="secondary" onClick={handleSecondary}>{t("secondary")}</GcdsButton>
</div>
```

### Accessible Loading State
```tsx
<GcdsButton
  buttonRole="primary"
  disabled={isLoading}
  aria-describedby={isLoading ? "loading-message" : undefined}
>
  {isLoading ? t("loading") : t("submit")}
</GcdsButton>
{isLoading && <div id="loading-message" className="sr-only">{t("submittingForm")}</div>}
```

## Button Roles
- **Primary**: Blue background, white text — one per page/section
- **Secondary**: White background, blue border and text
- **Destructive**: Red background, white text
- **Skip-to-nav**: Hidden until focused (accessibility)
