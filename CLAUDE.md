# Project Guidelines

## Git Workflow

1. **Always create a feature branch before starting any task**
   - Format: `feature/task-name`
   - Never commit directly to main

2. **When I say "save your work"**
   - Run `git add .`
   - Run `git commit -m` with a descriptive message

3. **When I say "merge to main"**
   - Run `git checkout main`
   - Run `git merge <feature-branch>`

## Before Committing

1. Run the dev server and check for errors
2. Fix all TypeScript errors before committing
3. Confirm the UI loads in the browser before declaring done
4. Commit with a clear message when a feature is complete

## Code Standards

1. Keep each file focused on one thing (single responsibility)
2. No `any` TypeScript types - use proper typing
