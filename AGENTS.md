# Agent Guidelines for Tracker Next

This document outlines the coding standards and practices to be followed by all agents working on this repository.

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
