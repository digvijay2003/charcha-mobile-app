# 0008 — Staging to main through a checked pull request

**Status:** Accepted
**Date:** 2026-09-14

## Context

The app is now shared as an APK, so there has to be a known-good line of code
to build it from. Until now `main` held only the first commit and all work sat
uncommitted on one machine.

`charcha-web` runs `development-digvijay → staging → main`, with an automatic
promotion into `staging` and a manual pull request into `main`. Its `main` has
no branch protection, so "production requires a pull request" is a convention
there, not a rule — nothing stops a direct push.

## Decision

- Two branches. Commits land on `staging`; `main` only receives pull requests
  from this repository's `staging`.
- `.github/workflows/ci.yml` runs **Source branch** and **Quality** (lockfile
  install, SDK dependency check, lint, typecheck, Android bundle) on pushes to
  `staging` and pull requests into `main`.
- Branch protection on `main` requires a pull request and both checks, pinned
  to the GitHub Actions app, and **applies to administrators**. Up-to-date
  branches are not required.
- Merge commits only; squash and rebase merging are disabled for the repository.
- `staging` is protected against deletion and force pushes only.

No automatic promotion step, unlike the web: the web's `staging` is a hosted
Vercel preview worth promoting into, while mobile's `staging` *is* the working
branch.

## Consequences

- Everything on `main` installs, lints, type-checks and bundles for Android.
  It is not proof the app looks or behaves right; checking on a phone is still
  manual.
- Renaming a job in `ci.yml` silently blocks every merge until the required
  checks are updated to match. `docs/pipeline.md` has the command.
- The owner cannot push a hotfix straight to `main`. Bypassing means editing
  branch protection by hand — deliberate and visible, which is the point.
- Re-enabling squash merging undoes this decision: one squashed release puts
  `staging` and `main` out of step, and every later pull request shows
  conflicts.
- A push to `staging` with its pull request open runs CI twice. Free for a
  public repository. If the repository is made private on a free GitHub plan,
  branch protection stops being available and the gate disappears.
