---
description: 'GCDS content and typography component patterns for headings, text, and links'
applyTo: '**/*.tsx, **/*.ts'
---

# GCDS Content Components

Use `GcdsHeading`, `GcdsText`, and `GcdsLink` from `@gcds-core/components-react` for typography and content.

## Components & Props

### GcdsHeading
```tsx
<GcdsHeading tag="h1" size="h1">Page Title</GcdsHeading>
<GcdsHeading tag="h2" size="h3" className="mb-4">Visually smaller heading</GcdsHeading>
```

- `tag`: Semantic HTML tag (`h1`–`h6`) — must follow heading hierarchy
- `size`: Visual size (`h1`–`h6`) — can differ from `tag` for styling
- Only one `h1` per page

### GcdsText
```tsx
<GcdsText size="body" className="mb-4">Standard paragraph text.</GcdsText>
<GcdsText size="small" className="text-gray-600">Secondary text.</GcdsText>
```

- `size`: `large` | `body` | `small` | `caption`

### GcdsLink
```tsx
<GcdsLink href="/dashboard">Internal link</GcdsLink>
<GcdsLink href="https://example.com" external>External link</GcdsLink>
```

- `href`: Link destination
- `external`: Adds external icon and `target="_blank"`

## Conversion Rules

Replace standard HTML elements with GCDS equivalents:

```tsx
// ❌ Before
<h1 className="text-3xl font-bold">Title</h1>
<p className="text-base mb-4">Text</p>
<a href="/page" className="text-blue-600">Link</a>

// ✅ After
<GcdsHeading tag="h1" size="h1">Title</GcdsHeading>
<GcdsText size="body" className="mb-4">Text</GcdsText>
<GcdsLink href="/page">Link</GcdsLink>
```

## Patterns

### Page Header
```tsx
<header className="mb-8">
  <GcdsHeading tag="h1" size="h1" className="mb-2">{title}</GcdsHeading>
  <GcdsText size="large" className="text-gray-700">{description}</GcdsText>
</header>
```

### Content Section
```tsx
<section className="mb-8">
  <GcdsHeading tag="h2" size="h2" className="mb-4">{title}</GcdsHeading>
  <GcdsText size="body" className="mb-6">{content}</GcdsText>
</section>
```

### Inline Link in Text
```tsx
<GcdsText size="body">
  For more details, see the{' '}
  <GcdsLink href="/user-guide">complete user guide</GcdsLink>.
</GcdsText>
```

### Card Content
```tsx
<div className="border rounded p-6">
  <GcdsHeading tag="h3" size="h4" className="mb-2">{title}</GcdsHeading>
  <GcdsText size="body" className="mb-4">{description}</GcdsText>
  <GcdsLink href={href}>{linkText}</GcdsLink>
</div>
```

## Text Size Guidelines
- **large** — Page introductions, hero sections
- **body** — Standard paragraph content
- **small** — Secondary information, metadata
- **caption** — Image captions, fine print

## Accessibility
- Maintain logical heading hierarchy (`h1` → `h2` → `h3`) without skipping levels
- Write descriptive link text — avoid "click here" or "read more" without context
- Use `external` prop for external links to provide appropriate indicators
- Use `size` prop for visual styling, `tag` prop for semantic structure
