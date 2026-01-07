# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aerodeus is a premium private charter flight booking platform built with Nuxt 4 + Vue 3. It's a single-page application with multilingual support (EN, RU, UZ) and API-driven content.

## Commands

```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Build for production
npm run generate     # Generate static site
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run preview      # Preview production build
```

## Tech Stack

- **Framework:** Nuxt 4.2.2, Vue 3.5.26 with Composition API
- **Language:** TypeScript 5.9.3
- **Styling:** SCSS with Sass 1.97.1
- **Animations:** GSAP 3.14.2 with ScrollTrigger
- **i18n:** @nuxtjs/i18n (strategy: no_prefix, default: uz)
- **Images:** @nuxt/image with WebP support
- **Linting:** ESLint with @antfu/eslint-config

## Architecture

### Directory Structure

- `app/components/` - Auto-imported Vue components organized by type:
  - `Ui/` - Reusable UI components (Button, Card)
  - `Layouts/` - Header, Footer, Menu
  - `Sections/` - Page sections (Hero, Booking, Partners, etc.)
  - `Modals/` - Modal dialogs (Booking, Application, Success)
  - `Icons/` - SVG icon components
- `app/composables/` - Reusable composables (useApiFetch)
- `app/assets/scss/` - Global styles (_variables, _mixins, _typography, _base)
- `i18n/locales/` - Translation files (en.json, ru.json, uz.json)
- `public/` - Static assets including sprite.svg

### Component Naming

Components use PascalCase directories and are auto-imported with path prefix: `SectionsHero`, `LayoutsHeader`, `ModalsBooking`, `UiButton`.

## Key Patterns

### API Integration

```typescript
const { data } = await useAsyncData(
  'key',
  async () => apiFetch('/endpoint/', { params: { lang: locale.value } }),
  { watch: [locale] } // Refetch when locale changes
);
```

Base URL: `https://api.aerodeus.com/api/v1`

### GSAP Animations

Always use context for proper cleanup:
```typescript
gsap.registerPlugin(ScrollTrigger);
const ctx = gsap.context(() => { /* animations */ }, element);
onBeforeUnmount(() => ctx?.revert());
```

### Props/Emits Pattern

```typescript
interface Props {
  modelValue: boolean
}
interface Emits {
  (e: 'update:modelValue', value: boolean): void
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
```

### Responsive Styling

Use the respond mixin with breakpoints:
```scss
@include respond(992px) { /* tablet styles */ }
```

Common breakpoints: 1470px, 1220px, 992px, 768px, 540px, 480px

## Style Conventions

- Block order: `<template>`, `<script setup>`, `<style scoped lang="scss">`
- Use SCSS variables from `_variables.scss` ($color-primary, $color-bg, etc.)
- All component styles are scoped
- Semi-colons required (ESLint rule)
- Brace style: 1tbs

## Translation Keys

Namespaced structure: `navbar.*`, `sections.benefits.*`, `modal.form.*`, `contact.*`
