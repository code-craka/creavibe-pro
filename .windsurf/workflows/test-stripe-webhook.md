---
description: Test Stripe webhook locally and in staging.
---

# test-stripe-webhook
description: Test Stripe webhook locally and in staging.

steps:
  - name: Start local dev server
    run: pnpm dev
  - name: Start Stripe CLI webhook forwarding
    run: stripe listen --forward-to localhost:3000/api/webhook
  - name: Trigger test event
    run: stripe trigger invoice.paid
  - name: Verify event received and processed (check DB and logs)