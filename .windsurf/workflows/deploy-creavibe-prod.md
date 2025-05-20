---
description: Run all tests, build the app, and deploy to Vercel production.
---

# deploy-creavibe-prod
description: Run all tests, build the app, and deploy to Vercel production.

steps:
  - name: Lint codebase
    run: pnpm lint
  - name: Run all tests
    run: pnpm test
  - name: Build app
    run: pnpm build
  - name: Deploy to Vercel
    run: vercel --prod
  - name: Notify team in Discord
    run: |
      curl -H "Content-Type: application/json" \
        -X POST \
        -d '{"content":"@everyone 🚀 **CreaVibe** deployed to production!"}' \
        -d '{"content":"🔗 <https://creavibe.app>"}' \
        https://discord.com/api/webhooks/1374321785641898036/SEeA7onq8Pb009MGJO67jaoyqu2t9-FO5Fj-2ARv4VDeE6u-h5C3wlO36kkrn4X3Xjd7