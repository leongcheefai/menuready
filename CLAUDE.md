# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MenuReady is a monorepo application with separate frontend and backend applications located in the `apps/` directory.

## Repository Structure

```
menuready/
├── apps/
│   ├── frontend/    # React + TypeScript + Vite application
│   └── backend/     # NestJS application
```

## Development Commands

### Frontend (apps/frontend)

```bash
# Navigate to frontend directory
cd apps/frontend

# Install dependencies
npm install

# Development server with HMR
npm run dev

# Build for production (includes TypeScript compilation)
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Backend (apps/backend)

```bash
# Navigate to backend directory
cd apps/backend

# Install dependencies
npm install

# Development server with watch mode
npm run start:dev

# Production build
npm run build

# Start production server
npm run start:prod

# Lint and auto-fix
npm run lint

# Format code
npm run format

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Debug tests
npm run test:debug
```

## Architecture

### Frontend (React + Vite)

- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.2
- **Dev Server**: Vite dev server on default port (typically 5173)
- **TypeScript Config**: Uses project references (`tsconfig.json` → `tsconfig.app.json` for app code, `tsconfig.node.json` for Vite config)
- **Linting**: ESLint 9 with flat config (`eslint.config.js`)
- **Entry Point**: `src/main.tsx` → `src/App.tsx`
- **Current State**: Scaffolded Vite + React template with minimal boilerplate

### Backend (NestJS)

- **Framework**: NestJS 9.0.0 (Node.js framework)
- **Architecture**: Module-based with dependency injection
- **Default Port**: 3000 (configured in `src/main.ts`)
- **Entry Point**: `src/main.ts` bootstraps `AppModule`
- **Module Structure**:
  - `AppModule` imports and organizes all feature modules
  - Controllers handle HTTP requests
  - Services contain business logic
  - Decorators-based routing and dependency injection
- **Testing**:
  - Jest for unit tests (`*.spec.ts` files in `src/`)
  - E2E tests in `test/` directory (`*.e2e-spec.ts`)
  - Configuration: `jest` config in `package.json`, separate `test/jest-e2e.json` for E2E
- **TypeScript**: CommonJS modules, decorators enabled, lenient type checking
- **Current State**: Scaffolded NestJS starter with basic controller/service/module structure

## TypeScript Configuration

### Frontend
- Uses TypeScript 5.9.3 with strict mode
- Project references for better build performance
- Separate configs for app code and build tooling

### Backend
- TypeScript 4.7.4 targeting ES2017
- CommonJS modules
- Lenient type checking (strictNullChecks, noImplicitAny disabled)
- Experimental decorators enabled for NestJS
- Build output to `dist/`

## Key Architectural Notes

1. **Monorepo without workspace manager**: Each app has its own `package.json` and `node_modules`. No shared workspace configuration (no pnpm-workspace.yaml, lerna.json, or turbo.json).

2. **Independent applications**: Frontend and backend are completely separate with no shared code. They must be installed and run independently.

3. **NestJS module system**: When adding new features to the backend, follow NestJS patterns:
   - Generate modules using `nest generate module <name>` or manually create
   - Register modules in `AppModule.imports`
   - Use dependency injection via constructors
   - Controllers handle routes, services contain business logic

4. **React patterns**: Frontend uses functional components with hooks. No state management library is currently configured.

5. **No database configured**: Backend has no ORM or database connection configured yet.
