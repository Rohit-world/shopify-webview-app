# Contributing

Thanks for taking the time to contribute.

## Ways to Contribute

- Report bugs
- Suggest features or improvements
- Improve documentation
- Submit code changes

## Before You Start

1. Check open issues and pull requests to avoid duplicate work.
2. For larger changes, open an issue first so we can align on approach.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. For iOS, install CocoaPods:
   ```bash
   cd ios
   pod install
   cd ..
   ```
4. Run Metro:
   ```bash
   npm run start
   ```
5. Run the app:
   ```bash
   npm run android
   npm run ios
   ```

## Branching and Commits

- Create a focused branch from `main`:
  ```bash
  git checkout -b feat/short-description
  ```
- Keep commits clear and meaningful.
- Prefer small, reviewable pull requests.

## Code Style and Quality

- Follow existing TypeScript/React Native patterns in the codebase.
- Run checks before opening a PR:
  ```bash
  npm run lint
  npm run test
  ```

## Pull Request Checklist

- The change is scoped and understandable.
- Lint and tests pass locally.
- Docs are updated when behavior/setup changes.
- UI changes include screenshots or short recordings.
- PR description explains what changed and why.

## Community Standards

By participating in this project, you agree to follow our
[Code of Conduct](./CODE_OF_CONDUCT.md).
