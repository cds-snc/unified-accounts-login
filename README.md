# Unified Accounts Login

Next.js 16 App Router app for [Unified Accounts](https://github.com/cds-snc/unified-accounts) identity flows (login, password, MFA, verification), integrated with Zitadel.

:gem: This project is based on the work done by the GC Forms team on their [identity portal](https://github.com/cds-snc/forms-idp-user-portal).

## Quick start

Run locally on port 3002:

```sh
pnpm install
pnpm dev
```

Open: [http://localhost:3002](http://localhost:3002)

## Useful commands

```sh
pnpm dev         # start dev server
pnpm build       # production build
pnpm start       # run production server
pnpm lint        # run ESLint
pnpm lint:fix    # auto-fix lint issues
pnpm type-check  # TypeScript checks
pnpm test        # run tests
```

## Required environment variables

These can be seen in `.env.example`.  Before starting the app run the following and fill in your values:

```sh
cp .env.example .env
```
