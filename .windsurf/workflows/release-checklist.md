---
description: Steps for a clean production release and AI memory update.
---

# release-checklist
description: Steps for a clean production release and AI memory update.

steps:
  - name: Review all open PRs for unmerged changes
  - name: Ensure .windsurfrules is up to date with any new rules or caveats
  - name: Run deploy-creavibe-prod workflow
  - name: Post a memory update in Cascade: "Release YYYY-MM-DD: [short summary of changes, migrations, breaking changes, new rules]"
  - name: Tag release in GitHub and update CHANGELOG.md