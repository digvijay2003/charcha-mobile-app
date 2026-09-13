# Pipeline

Two long-lived branches and one gate
([ADR 0008](decisions/0008-staging-to-main-through-a-checked-pull-request.md)).

```
staging  ──── pull request ────►  main
you commit here                   merges only when checks pass
```

| Branch | Role | How code arrives |
| --- | --- | --- |
| `staging` | Where work happens | You commit and push directly |
| `main` | Finished work — build APKs to share from here | A pull request from `staging`, merged only when every check is green |

This differs from `charcha-web`, where `development-digvijay` promotes into
`staging` automatically. The web's `staging` is a hosted preview; mobile has no
hosted preview, so one hop is enough.

## The checks

`.github/workflows/ci.yml` runs two jobs. Their **names are the required status
checks on `main`** — rename a job and branch protection must be updated too
(see [Changing the checks](#changing-the-checks)).

| Check | What it does | Why |
| --- | --- | --- |
| **Source branch** | Fails a pull request into `main` unless it comes from this repository's `staging` | GitHub cannot restrict a pull request's source branch by itself, and the repo is public, so a fork's branch named `staging` must not pass either |
| **Quality** | `npm ci` → `expo install --check` → lint → typecheck → Android bundle | Proves the lockfile installs, native libraries match SDK 57, and the whole app compiles for a phone |

The Android bundle is the step that matters most. Lint and typecheck can pass
while something only resolves on web; `expo export --platform android` builds
what the phone actually loads.

The workflow runs:

- **On every push to `staging`** — early feedback, even with no pull request open.
- **On every pull request into `main`**, and again on each push while it is open — the gate.

So a push to `staging` while its pull request is open runs the workflow twice,
once per event. That is deliberate: branch protection reads the pull-request
run. `concurrency` only cancels an older run of the *same* event on the same
branch, never the other event's run.

## What `main` enforces

Set in GitHub branch protection, not in the workflow file:

| Rule | Setting | Why |
| --- | --- | --- |
| Pull request required | Yes, 0 approvals | Solo developer; GitHub does not let you approve your own pull request |
| Required checks | `Quality` and `Source branch`, from GitHub Actions only | The gate |
| Branch must be up to date | **Off** | Each merge adds a merge commit `staging` does not have; "on" would demand a staging update before every pull request |
| Include administrators | **Yes** | Otherwise the repository owner can push straight past the gate |
| Force pushes, deletion | Blocked | |

`staging` is protected only against deletion and force pushes, so direct commits
still work. GitHub offers a "Delete branch" button after a merge; for `staging`
it now refuses.

The repository allows **merge commits only**. Squash and rebase merging are off:
both put commits on `main` that `staging` never had, and the next pull request
from `staging` then shows conflicts in files nobody touched.

## Day to day

```bash
git checkout staging
# …work and commit…
git push origin staging        # CI runs — see the Actions tab on GitHub
```

When `staging` holds something worth releasing, open a pull request:

```bash
gh pr create --base main --head staging --title "Release: <what is in it>"
```

or on GitHub: **Pull requests → New pull request**, base `main`, compare
`staging`. When both checks are green, merge with **Create a merge commit**.

Build APKs to share from `main`, so what people install is always checked code:

```bash
git checkout main && git pull
npm run build:apk
git checkout staging
```

## Changing the checks

Rename or add a job and `main` will wait forever for a check that no longer
exists. Update the required checks in the same change:

```bash
gh api -X PATCH repos/digvijay2003/charcha-mobile-app/branches/main/protection/required_status_checks \
  --input - <<'EOF'
{ "strict": false, "checks": [ { "context": "Quality", "app_id": 15368 }, { "context": "Source branch", "app_id": 15368 } ] }
EOF
```

`app_id` 15368 is GitHub Actions. Pinning it means no other integration can
satisfy the gate by reporting a check with the same name.

**If GitHub Actions itself is down** and something must reach `main`, the only
way past is to switch off *Do not allow bypassing the above settings* under
**Settings → Branches → main**, merge, and switch it back on. That is meant to be
a visible, deliberate act.

## Pushing from this machine

The SSH key here is passphrase-protected, so push over HTTPS through `gh`
without changing git config:

```bash
git -c credential.helper='!gh auth git-credential' \
    -c url."https://github.com/".insteadOf="git@github.com:" \
    push origin staging
```
