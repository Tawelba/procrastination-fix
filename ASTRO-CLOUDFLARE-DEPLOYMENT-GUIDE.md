# Deploy the Astro Redesign with Cloudflare Workers Builds

This repository is connected to **Cloudflare Workers Builds**, not Cloudflare Pages. The currently live site publishes the repository root through a bot-generated Wrangler configuration. The Astro redesign must instead be built first and then publish `dist/` as static Worker assets.

## Confirmed Worker configuration

- Worker name: `procrastination-fix`
- Repository: `Tawelba/procrastination-fix`
- Root directory: `/`
- Production build command required: `npm run build`
- Production deploy command required: `npx wrangler deploy`
- Astro output/assets directory: `./dist`

The repository now contains `wrangler.jsonc` with the correct Worker name and `dist` asset directory.

## How the deployment works

1. Workers Builds checks out the selected GitHub commit.
2. It installs packages from `package-lock.json`.
3. It runs `npm run build`.
4. Astro generates the site in `dist/`.
5. Wrangler uploads the files in `dist/` to the existing `procrastination-fix` Worker.
6. On production, `wrangler deploy` makes that version active.

The old root `index.html` is no longer published because Wrangler uploads only `dist/`. It can remain in the repository temporarily as a migration reference.

## Files that must be committed

- `.node-version`
- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `wrangler.jsonc`
- `src/`
- `public/`
- `.gitignore`

Do not commit:

- `node_modules/`
- `dist/`
- `.astro/`
- `.npm-cache/`

## Safe preview-first procedure

### 1. Preserve the current source version

Before merging Astro into production, optionally tag the currently working version:

```bash
git checkout main
git pull
git tag pre-astro-production
git push origin pre-astro-production
```

Cloudflare also retains deployed Worker versions, so the tag is an additional source-code safeguard.

### 2. Create an Astro preview branch

```bash
git checkout -b astro-redesign
git add .
git status
git commit -m "Convert landing page to Astro and Tailwind"
git push -u origin astro-redesign
```

Check `git status` before committing and confirm the excluded directories listed above are absent.

### 3. Change Workers Builds settings

Open Cloudflare Dashboard:

1. Go to **Workers & Pages**.
2. Select **procrastination-fix**.
3. Open **Settings → Builds**.
4. Edit the build configuration.

Use:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Build token | Keep `Workers Builds - 2026-07-10 22:20` |
| Build variables | None required |

If Cloudflare provides a separate **non-production branch deploy command**, use:

```text
npx wrangler versions upload
```

This distinction is important:

- `wrangler deploy` creates and activates a production deployment.
- `wrangler versions upload` creates a preview version without replacing production.

If the dashboard shows only one deploy-command field and it is currently `versions upload`, change the production command to `npx wrangler deploy` before the final production push.

### 4. Verify the Wrangler configuration

The committed file should remain:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "procrastination-fix",
  "compatibility_date": "2026-07-11",
  "observability": {
    "enabled": true
  },
  "routes": [
    {
      "pattern": "procrastination-fix.com",
      "custom_domain": true
    }
  ],
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page",
    "html_handling": "auto-trailing-slash"
  }
}
```

Do not restore the bot's original `"directory": "."`; that would publish the source repository rather than the Astro build.

### 5. Trigger the preview build

Push the `astro-redesign` branch after saving the Cloudflare settings. Open the resulting build under the Worker's deployment/version history.

A successful build should show:

- Dependencies installed
- `npm run build` completed
- Four Astro routes generated
- Assets read from `dist`
- A preview version uploaded

Open the preview URL and test:

- Homepage and responsive styling
- Dark-mode toggle and refresh persistence
- Header anchor links
- Step-card hover behavior
- Google Form links
- Affiliate disclosure
- `/privacy-policy/`
- `/terms/`
- Custom 404 behavior
- `/og-image.jpg`
- `/pdf-guide.pdf`

Do not treat the Focusmate placeholder as final until the real affiliate ID is added.

### 6. Deploy to production

After preview testing:

1. Open a pull request from `astro-redesign` into `main`.
2. Confirm the preview build is successful.
3. Merge the pull request.
4. Confirm the `main` build uses `npx wrangler deploy`.
5. Wait for the new version to become the Active Deployment.

The existing custom domain should remain attached because the Worker name is unchanged.

## Production verification

After deployment:

1. Open both the `workers.dev` URL and the custom domain.
2. Use a private window or hard refresh.
3. Test all preview checklist items again.
4. Confirm the active deployment references the expected Git commit.
5. Confirm Cloudflare uploaded `dist`, not the repository root.

## Rollback

If the redesign has a serious production issue:

1. Open the `procrastination-fix` Worker.
2. Go to **Deployments** or **Version History**.
3. Select the previously active working version.
4. Use the rollback/deploy option to make it active again.

Then fix the Astro branch, create another preview version, test it, and redeploy.

## Local verification for future releases

Run:

```bash
npm install
npm run check
npm run build
npx wrangler deploy --dry-run
```

Expected Astro routes:

- `dist/index.html`
- `dist/privacy-policy/index.html`
- `dist/terms/index.html`
- `dist/404.html`

The Wrangler dry run should report that it read assets from the project's `dist` directory and then exit without deploying.

## Troubleshooting

### The old page is still served

Check that the new Git commit became the Active Deployment. If the build used `wrangler versions upload`, it created a version but did not activate it.

### Cloudflare uploads source files

Check `wrangler.jsonc`. The assets directory must be `./dist`, not `.`.

### Build succeeds but deployment fails with a Worker-name error

The Wrangler name must exactly match `procrastination-fix`.

### `dist` does not exist

The build command is missing or failed. Set it to `npm run build` and inspect the Astro error earlier in the build log.

### Astro or Wrangler command not found

Confirm `package.json` and `package-lock.json` were committed and that dependency installation completed.

### Wrong Node version

Keep `.node-version` committed. It requests Node `22.16.0`, which satisfies the installed Astro version.

### Legal routes return 404

Use `/privacy-policy/` and `/terms/`. The `auto-trailing-slash` asset setting maps these to the generated folder index files.

## After the migration is stable

After several days of successful production operation, the legacy root HTML files may be removed in a separate commit. They do not interfere while Wrangler is configured to publish only `dist/`.
