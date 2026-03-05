---
description: 'GCDS layout component patterns for page structure, containers, grids, header, and footer'
applyTo: '**/*.tsx, **/*.ts'
---

# GCDS Layout Components

Use `GcdsContainer`, `GcdsGrid`, `GcdsHeader`, and `GcdsFooter` from `@gcds-core/components-react` for page structure and responsive design.

## Components & Props

### GcdsContainer
Controls content max-width.

```tsx
<GcdsContainer size="xl" className="py-6">
  {children}
</GcdsContainer>
```

**`size`**: `sm` | `md` | `lg` | `xl` | `full`

### GcdsGrid
CSS Grid wrapper for responsive layouts.

```tsx
<GcdsGrid columns="1fr 2fr" gap="24">
  <aside>Sidebar</aside>
  <main>Content</main>
</GcdsGrid>
```

**`columns`**: CSS Grid template (e.g., `"1fr 1fr"`, `"repeat(3, 1fr)"`, `"repeat(auto-fit, minmax(300px, 1fr))"`)
**`gap`**: Grid gap in pixels

### GcdsHeader
Official Government of Canada header with built-in language toggle.

```tsx
<GcdsHeader langHref="/fr" skipToHref="#main-content">
  {/* Optional custom content in header */}
</GcdsHeader>
```

### GcdsFooter
Official Government of Canada footer.

```tsx
<GcdsFooter display="compact" langHref="/fr" />
```

**`display`**: `compact` | `full`

## Layout Patterns

### Standard Page Layout
```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GcdsHeader langHref="/fr" skipToHref="#main-content" />
      <main id="main-content">
        <GcdsContainer size="xl" className="min-h-screen py-8">
          {children}
        </GcdsContainer>
      </main>
      <GcdsFooter display="compact" langHref="/fr" />
    </>
  );
}
```

### Sidebar Layout
```tsx
<GcdsContainer size="full">
  <GcdsGrid columns="250px 1fr" gap="32" className="min-h-screen">
    <aside className="bg-gray-50 p-6">{sidebar}</aside>
    <main className="p-6">{children}</main>
  </GcdsGrid>
</GcdsContainer>
```

### Responsive Card Grid
```tsx
<GcdsGrid columns="repeat(auto-fit, minmax(300px, 1fr))" gap="24">
  {items.map(item => <Card key={item.id} {...item} />)}
</GcdsGrid>
```

## Container Size Guidelines
- **sm** — Cards, modals, narrow content
- **md** — Forms, articles
- **lg** — Main content areas
- **xl** — Full layouts, dashboards
- **full** — Edge-to-edge content

## Grid Patterns
```tsx
// Equal columns
<GcdsGrid columns="1fr 1fr" gap="24">...</GcdsGrid>

// Proportional (sidebar + main)
<GcdsGrid columns="1fr 3fr" gap="32">...</GcdsGrid>

// Auto-fit responsive
<GcdsGrid columns="repeat(auto-fit, minmax(250px, 1fr))" gap="20">...</GcdsGrid>
```

## Accessibility
- Always set `skipToHref` on `GcdsHeader` pointing to `#main-content`
- Use semantic HTML (`<main>`, `<aside>`, `<nav>`) within GCDS layout components
- Use ARIA landmarks for content regions
