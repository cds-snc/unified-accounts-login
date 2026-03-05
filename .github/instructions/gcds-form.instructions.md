---
description: 'GCDS form component patterns, controlled inputs, and validation for @gcds-core/components-react'
applyTo: '**/*.tsx, **/*.ts'
---

# GCDS Form Components

Use `GcdsInput`, `GcdsTextarea`, `GcdsSelect`, and `GcdsFieldset` from `@gcds-core/components-react` for all form inputs.

## Components & Props

### GcdsInput
```tsx
<GcdsInput
  inputId="email"         // required — unique ID
  label="Email address"   // required — visible label
  hint="Helper text"      // optional
  type="email"            // text, email, password, tel, url, etc.
  name="email"
  value={formData.email}
  onInput={(e) => setFormValue('email', (e.target as HTMLInputElement).value)}
  errorMessage={getError('email')}
  required
/>
```

### GcdsTextarea
```tsx
<GcdsTextarea
  textareaId="message"
  label="Your message"
  name="message"
  value={formData.message}
  onInput={(e) => setFormValue('message', (e.target as HTMLTextAreaElement).value)}
  errorMessage={getError('message')}
  rows={4}
  required
/>
```

### GcdsSelect
```tsx
<GcdsSelect
  selectId="province"
  label="Province"
  name="province"
  value={formData.province}
  onInput={(e) => setFormValue('province', (e.target as HTMLSelectElement).value)}
  errorMessage={getError('province')}
  required
>
  <option value="">Select...</option>
  <option value="ON">Ontario</option>
</GcdsSelect>
```

### GcdsFieldset
```tsx
<GcdsFieldset fieldsetId="personal-info" legend="Personal Information" hint="All fields are required">
  {/* Group related inputs here */}
</GcdsFieldset>
```

## CRITICAL: Controlled Input Pattern

GCDS components with `defaultValue` **do not** submit form data properly.

**Always use controlled inputs:**
1. Store values in `useState`
2. Bind `value` prop to state
3. Update state via `onInput`
4. Read from state in form submission — **not** from `FormData`

```tsx
"use client";
import { useState, useActionState } from "react";
import { GcdsInput, GcdsFieldset } from "@gcds-core/components-react";

export function ExampleForm() {
  const [formData, setFormData] = useState({ email: "", name: "" });

  const setFormValue = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const localFormAction = async (previousState: any, _formData: FormData) => {
    // Read from controlled state, NOT _formData
    const { email, name } = formData;
    // ... validate and submit
  };

  const [state, formAction] = useActionState(localFormAction, {});
  const getError = (field: string) =>
    state.validationErrors?.find((e: any) => e.fieldKey === field)?.fieldValue || "";

  return (
    <form action={formAction} noValidate>
      <GcdsInput
        inputId="email"
        label={t("email.label")}
        type="email"
        name="email"
        value={formData.email}
        onInput={(e) => setFormValue('email', (e.target as HTMLInputElement).value)}
        errorMessage={getError('email')}
        required
      />
    </form>
  );
}
```

## Validation Integration

Use Valibot schemas. Error messages are i18n keys:

```tsx
const getError = (field: string) => {
  const error = state.validationErrors?.find((e: any) => e.fieldKey === field);
  return error?.fieldValue || "";
};

// errorMessage prop displays styled error automatically
<GcdsInput inputId="email" errorMessage={getError('email')} ... />
```

## Built-in Accessibility
- Automatic `aria-labelledby` connecting labels to inputs
- `aria-describedby` linking errors to inputs
- Required field visual and screen reader indication
- Logical tab order and focus indicators
