# AGENTS.md

This document provides guidelines for AI agents working in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15+, TypeScript, and Tailwind CSS. It features a terminal-inspired design with smooth animations, responsive layouts, and a contact form powered by Resend.

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Production build for Cloudflare Pages
npm run pages:build

# Start production server
npm start

# Lint codebase
npm run lint

# Type checking (via TypeScript compiler)
npx tsc --noEmit
```

## Code Style Guidelines

### TypeScript

- Enable `strict: true` in all TypeScript configurations
- Use explicit types for function parameters and return values
- Prefer interfaces over type aliases for object shapes
- Use `any` sparingly; prefer explicit types or `unknown`
- Leverage generics when working with reusable components

### React Components

- Use functional components with hooks (`useState`, `useEffect`, etc.)
- Mark client components with `'use client'` at the top
- Mark server actions with `'use server'` at the top
- Use PascalCase for component names (e.g., `PixelatedNav`)
- Destructure props for clarity
- Use optional chaining and nullish coalescing for safe access

### Imports

Organize imports in this order:
1. Node.js built-in modules
2. External dependencies (React, Radix UI, etc.)
3. Project utilities (`@/lib/utils`)
4. Project components (`@/components/ui/*`)
5. Relative imports

```typescript
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
```

### Naming Conventions

- **Components**: PascalCase (`HeroSection`, `SkillsGrid`)
- **Functions/variables**: camelCase (`isOpen`, `handleSubmit`)
- **Constants**: SCREAMING_SNAKE_CASE for config values
- **Files**: kebab-case for utilities, PascalCase for components
- **CSS classes**: Use Tailwind's utility classes with `cn()` helper

### CSS and Styling

- Use Tailwind CSS for all styling
- Use `cn()` from `@/lib/utils` to merge classes safely
- Follow shadcn/ui patterns for component styling
- Use CSS variables from `globals.css` for theming colors
- Use `data-*` attributes sparingly for specific component states

### Error Handling

- Wrap async operations in try-catch blocks
- Return error objects from server actions: `{ error: 'message' }`
- Log errors with context: `console.error('Action failed:', error)`
- Provide user-friendly error messages
- Handle null/undefined cases gracefully with optional chaining

### File Structure

```
/app          - Next.js App Router pages and layouts
/components   - React components (grouped by feature)
/components/ui - Base UI components (buttons, inputs, etc.)
/lib         - Utility functions and configurations
/public      - Static assets
```

### Component Patterns

Follow the shadcn/ui pattern for base components:
- Use `class-variance-authority` (CVA) for variant management
- Define variants with TypeScript interfaces
- Use Radix UI primitives for accessibility
- Export both the component and its variants

Example from `components/ui/button.tsx`:
```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("...", { variants: { variant: {...}, size: {...} } })

function Button({ className, variant, size, ...props }: ...) {
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
```

### Environment Variables

- Use `.env.local` for local development
- Prefix Cloudflare/Wrangler variables appropriately
- Never commit secrets to version control
- Use `process.env` to access variables

### Deployment

- Vercel for primary deployment (automatic via Git)
- Cloudflare Pages via `npm run pages:build` for edge deployment
- Use `next.config.ts` for configuration
- Output: `.vercel/output` for Vercel, `.cloudflare/pages` for Cloudflare

### Linting and Formatting

- ESLint configured with `next/core-web-vitals` and `next/typescript`
- Run `npm run lint` before committing
- Fix all warnings and errors
- No custom prettier config; rely on editor formatting
