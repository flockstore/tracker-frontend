# Agent Guidelines for Tracker Next

This document outlines the coding standards and practices to be followed by all agents working on this repository.

## Folder Structure & Naming Conventions
- **Views**: All page-level logic must reside in a `views` directory.
    - Structure: `views/ViewName/ViewName.tsx`.
    - Example: `views/Tracking/Tracking.tsx`.
- **Partials**: Sub-components of a view should be in a `partials` folder within the view.
    - Structure: `views/ViewName/partials/ComponentName/ComponentName.tsx`.
    - Example: `views/Tracking/partials/TrackingForm/TrackingForm.tsx`.
- **CamelCase**: All component folders and files must use CamelCase.
    - `MyComponent/MyComponent.tsx` (Correct)
    - `my-component/index.tsx` (Incorrect)
- **App Directory**: The `app/` directory should only contain the route definitions and minimal setup to render a View. No business logic or complex UI usage directly in `app/`.

## Testing
- **Everything must be unit tested.** Ensure comprehensive test coverage for all components and logic.

## TypeScript Configuration & Style
- **No Semicolons**: Do not use semicolons at the end of statements (`semi: false`).
- **No Double Quotes**: Use single quotes for strings (`singleQuote: true`).
- **Strict Typing**: ensure everything is strictly typed. Avoid `any` types.
- **Component Definition**: 
  - Prefer arrow functions for components: `const Component = () => {}`
  - Export: `export default Component` (avoid `export default function Component() {}`).

## Documentation
- **TSX Documentation**: All code must be documented using JSDoc/TSDoc comments.

## General
- Follow standard Next.js best practices unless overridden above.
