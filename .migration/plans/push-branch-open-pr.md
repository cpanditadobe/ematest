# Push Branch and Open Pull Request

The hero-split responsive layout fix is committed locally on branch `fix-hero-split-responsive-layout` (commit `5fe61fb`). This plan covers pushing that branch and opening a PR against `main`. Execution requires **Execute mode** — plan mode cannot run the push or API calls.

## Context

- **Repo:** `cpanditadobe/ematest` (remote `origin` → `https://github.com/cpanditadobe/ematest.git`)
- **Branch:** `fix-hero-split-responsive-layout`, one commit, single file changed (`blocks/hero-split/hero-split.css`)
- **Base:** `main`
- **Blocker so far:** prior pushes failed with `could not read Username for 'https://github.com'` — no credential helper, auth header, or token was present in the session. `gh` CLI is not installed, so the PR must be created via the GitHub REST API (credentials injected automatically when the opt-in is active).

## Checklist

- [ ] Verify git credentials are now injected (`git config --get-all credential.helper`, check for `http.*.extraheader`, and `GH_TOKEN`/`GITHUB_TOKEN` env vars)
- [ ] If still absent, stop and confirm with the user that the **git/GitHub** permission toggle is enabled and the session has been restarted (do not accept a pasted token; it must be entered in Settings)
- [ ] Push the branch: `git push -u origin fix-hero-split-responsive-layout`
- [ ] Create the PR via GitHub REST API (`POST /repos/cpanditadobe/ematest/pulls`) — no manual token in the request; rely on injected credentials
- [ ] Confirm the PR URL is returned and report it to the user

## PR Details

- **Title:** Fix hero-split responsive image layout
- **Base ← Head:** `main` ← `fix-hero-split-responsive-layout`
- **Body:**
  - The three hero images are authored inside a single paragraph, but the 2-column grid was applied to the paragraph's parent, so the grid held only one item and the images collapsed on top of each other with zero height (no tiling).
  - Fix: `display: contents` on the paragraph so the pictures become real grid items, first image spans full width as the hero, images given a 3:2 aspect ratio. Mobile/tablet stack the gallery with text separately below; desktop keeps the two-column text-beside-images layout.
  - Verified at 375px, 768px, and 1200px.
  - **Preview:** `https://fix-hero-split-responsive-layout--ematest--cpanditadobe.aem.page/`
  - Footer: 🤖 Generated with [Claude Code](https://claude.com/claude-code)

## Fallback if credentials still fail

- [ ] Report that push/PR cannot proceed without the git opt-in; leave the commit intact on the local branch
- [ ] Offer the user the option to push manually, or restart the session again and retry

---
*Execution requires Execute mode — plan mode cannot perform the push or create the PR.*
