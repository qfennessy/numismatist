# Implementation Plan

This document outlines a phased, testable, clear, and concise implementation plan for the Numismatist Coin Collection API and Angular client.

## Overview
- **Objective**: Deliver a robust, scalable coin-collection system with API, frontend services, UI, analytics, auth, and deployment.
- **Approach**: Break work into incremental phases. Each phase has defined deliverables, testing criteria, and review gates.

---

## Phase 1: Project Setup & Scaffolding

**Timeline**: 1 day

**Tasks**:
- Initialize repository with Angular CLI and Node/Express backend
- Configure TypeScript, linting (ESLint/TSLint) and formatting (Prettier)
- Create `README.md` with setup instructions
- Define `environment.ts` tokens for API base URL

**Deliverables**:
- Clean project structure under `/frontend` and `/backend`
- Basic CI pipeline (lint & build)

**Testing**:
- Verify `npm run build` passes on both projects
- Run a sample unit test in frontend (`ng test --watch=false`)

**Review Gate**: PR approved when structure is clear and builds without errors.

---

## Phase 2: Data Models & API Definitions

**Timeline**: 2 days

**Tasks**:
- Define backend data models (Coin, CoinImage, Provenance, Note, Mint) using TypeScript or ORM
- Generate OpenAPI (Swagger) spec
- Implement REST endpoints: CRUD for coins, image upload, stats
- Wire up error handling middleware and validation (Joi/Zod)

**Deliverables**:
- `/docs/swagger.json` and Swagger-UI at `/docs`
- Unit tests for each endpoint (Jest/Mocha)

**Testing**:
- API tests: success and failure paths
- Schema validation tests

**Review Gate**: 90% test coverage on models and controllers.

---

## Phase 3: Angular Services & State Management

**Timeline**: 2 days

**Tasks**:
- Implement `CoinService`, `CoinStatsService`, `BaseService<T>`
- Define `CoinFilter`, `Paged<T>` types
- Add `@ngrx/component-store` for caching or simple in-memory service
- Create `AuthInterceptor` to attach JWT

**Deliverables**:
- Typed services with method signatures matching API
- Simple store for coins

**Testing**:
- Unit tests using `HttpTestingController`
- Mock interceptors to verify headers

**Review Gate**: All service methods covered by tests; mock store behavior validated.

---

## Phase 4: UI Components & Routing

**Timeline**: 3 days

**Tasks**:
- Build core components: `CoinList`, `CoinDetail`, `CoinForm`, `ImageGallery`, `StatsDashboard`
- Set up routing and guards (`CanActivate`) for protected views
- Implement reactive forms with validation
- Integrate image upload with progress bars

**Deliverables**:
- Responsive UI with basic styling
- Navigation between views

**Testing**:
- Component unit tests (Jasmine/Karma)
- E2E tests (Cypress) for main user flows

**Review Gate**: E2E cover add/edit/delete coin and image upload.

---

## Phase 5: Analytics & Reporting

**Timeline**: 1 day

**Tasks**:
- Consolidate stats endpoints into `/analytics`
- Display charts (e.g., Chart.js or D3) for value, composition, timeline

**Deliverables**:
- Analytics page with interactive charts

**Testing**:
- Smoke tests to load data and render charts

**Review Gate**: Charts render correct mock data.

---

## Phase 6: Authentication & Authorization

**Timeline**: 1 day

**Tasks**:
- Implement login/logout and token refresh flows
- Protect write operations on backend with role checks
- Enforce `isPublic` flag in GET operations

**Deliverables**:
- Auth module in frontend
- Role-based guards and backend middleware

**Testing**:
- Auth unit tests and integration tests for protected routes

**Review Gate**: Unauthorized requests yield 401/403.

---

## Phase 7: CI/CD & Deployment

**Timeline**: 1 day

**Tasks**:
- Extend CI: run linting, unit tests, E2E on merge
- Configure deployment: staging and production (e.g., Netlify/Heroku)
- Automate versioning and release notes via GitHub Actions

**Deliverables**:
- Passing pipelines and auto-deploy on `main` branch

**Testing**:
- Smoke test on staging URL

**Review Gate**: Deployment artifacts accessible and functional.

---

## Maintenance & Next Steps
- Monitor performance and error logs
- Plan future features: bulk import, user roles, marketplace integration
- Regularly update dependencies
