---
name: commit-push-pr
description: This skill should be used when the user asks to "commit and push", "open a PR", "create a pull request", "ship this change", "push my changes", or "commit these changes and make a PR". Stages changed files, writes a commit, pushes the branch, and opens a GitHub pull request.
---

# commit-push-pr

Stage pending changes, commit them with a meaningful message, push the branch, and open a GitHub PR — all in one flow.

## 1. Pre-flight

Run these three commands in parallel to understand what will be committed:

```bash
git status
git diff HEAD
git log --oneline -8
```

- `git status` reveals untracked and modified files.
- `git diff HEAD` shows the exact lines changing.
- `git log` shows the repo's commit message style — match it.

## 2. Stage files

Add files by name, not by glob:

```bash
git add src/foo.ts src/bar.vue   # good — explicit
git add .                        # avoid — may include secrets or build artifacts
```

Never stage `.env`, credential files, or large binaries. Warn the user if any are present.

## 3. Commit

Draft a message that explains *why*, not *what*. One sentence is usually enough; add a blank line and a short paragraph only when context genuinely matters.

Pass the message via HEREDOC and append the `Co-Authored-By` trailer:

```bash
git commit -m "$(cat <<'EOF'
Short imperative summary of the why

Optional longer explanation if needed.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

If a pre-commit hook fails, fix the underlying issue and create a **new** commit — never use `--amend` or `--no-verify`.

## 4. Push

```bash
git push -u origin HEAD
```

`-u` sets the upstream so subsequent `git push` calls need no arguments. If the push is rejected (non-fast-forward), investigate before forcing — confirm with the user before `--force-with-lease`.

## 5. Open a PR

Use `gh pr create` with a HEREDOC body. Base branch is `main` unless the user specifies otherwise.

```bash
gh pr create --title "Short PR title (under 70 chars)" --body "$(cat <<'EOF'
## Summary
- Bullet one
- Bullet two

## Test plan
- [ ] `npm run test:unit` passes
- [ ] Manual smoke test in the browser

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

PR title rules:
- Under 70 characters
- Imperative mood ("Add X", "Fix Y", "Remove Z")
- No trailing period

## 6. Return the URL

After `gh pr create` succeeds, print the PR URL so the user can open it directly.

## Safety rules

- Never `git push --force` to `main`/`master` — warn the user and stop.
- Never skip hooks (`--no-verify`) unless the user explicitly asks.
- Never commit files that look like secrets (`.env`, `*credentials*`, `*token*`).
- If working tree is clean (nothing to commit), say so and stop.
