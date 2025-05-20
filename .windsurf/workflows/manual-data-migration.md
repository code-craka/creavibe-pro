---
description: Apply pending SQL migrations and verify RLS.
---

# migrate-db
description: Apply pending SQL migrations and verify RLS.

steps:
  - name: Backup production DB to S3
    run: supabase db dump > s3://backup-bucket/prod-$(date +%F).sql
  - name: Apply SQL migrations
    run: supabase db push
  - name: Verify all tables have RLS enabled
    run: psql ... -c "\d +"
  - name: Run post-migration tests
    run: pnpm test:migrations