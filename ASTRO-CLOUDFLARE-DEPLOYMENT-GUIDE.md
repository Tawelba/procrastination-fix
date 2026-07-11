# Deploying the Astro Redesign to the Existing Cloudflare Pages Site

This guide replaces the currently deployed root `index.html` with the Astro-generated redesign while keeping the existing production deployment available for rollback.

## What changes after the migration

The old deployment serves files directly from the repository. The Astro deployment adds a build step:

1. Cloudflare checks out the selected GitHub commit.
2. Cloudflare installs the packages listed in `package-lock.json`.
3. Cloudflare runs `npm run build`.
4. Astro writes the finished website to `dist/`.
5. Cloudflare publishes only the contents of `dist/`.

The legacy root `index.html`, `privacy-policy.html`, and `terms.html` are therefore not published by the Astro build. They remain migration references until you choose to remove them later.

## Files that must be committed

Commit these files and directories:

- `.node-version`
- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `src/`
- `public/`
- `.gitignore`

Do not commit these generated or local directories:

- `node_modules/`
- `dist/`
- `.astro/`
- `.npm-cache/`

The existing `.gitignore` already excludes them.

## Recommended safe deployment sequence

### 1. Confirm the existing production deployment

Before changing anything:

1. Open Cloudflare Dashboard.
2. Go to **Workers & Pages**.
3. Select the existing Pages project.
4. Open **Deployments**.
5. Confirm the current production deployment is successful.
6. Record its commit identifier and deployment date.

That successful production deployment will remain available as a rollback target.

### 2. Preserve the currently working version in Git

Make sure the current working static site has already been committed. Optionally create a tag before merging the redesign:

```bash
git checkout main
git pull
git tag pre-astro-production
git push origin pre-astro-production
```

The tag is optional because Cloudflare also retains successful production deployments, but it makes the old source version easy to identify.

### 3. Put the Astro redesign on a separate branch

Use a preview branch instead of pushing directly to production:

```bash
git checkout -b astro-redesign
git add .
git status
git commit -m "Convert landing page to Astro and Tailwind"
git push -u origin astro-redesign
```

Before committing, inspect `git status` and confirm that `node_modules`, `dist`, `.astro`, and `.npm-cache` are absent.

### 4. Update the Cloudflare Pages build settings

In Cloudflare Dashboard:

1. Go to **Workers & Pages**.
2. Select the existing Pages project.
3. Open **Settings**.
4. Find **Build & deployments** or **Build configurations**.
5. Edit the production and preview build configuration.

Use these values:

| Setting | Value |
| --- | --- |
| Framework preset | Astro, if available |
| Production branch | `main` or the branch currently used for production |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Leave blank when the Astro project is at the repository root |

The committed `.node-version` requests Node.js `22.16.0`, which satisfies Astro's runtime requirement and matches Cloudflare Pages' current v3 build environment.

Do not set the output directory to `/`, `public`, or the repository root. `public/` contains source assets that Astro copies into `dist/`; it is not the finished site.

### 5. Make sure preview deployments are enabled

Under the project's branch deployment controls:

1. Keep `main` as the production branch.
2. Enable preview deployments for non-production branches.
3. If custom preview branch rules are used, include `astro-redesign`.

Changing the build settings does not replace the currently successful production deployment by itself. Production changes only when a new production deployment succeeds or you manually promote another deployment.

### 6. Trigger and inspect the Astro preview

After pushing `astro-redesign`, Cloudflare should create a preview deployment. Open **Deployments** and select the preview build.

A successful log should show these broad stages:

- Git repository cloned
- Node version selected
- Dependencies installed
- `npm run build` executed
- Astro generated the static routes
- `dist` uploaded

Cloudflare will provide a URL similar to:

```text
https://astro-redesign.your-project.pages.dev
```

or a hash-based preview URL.

Test all of the following on the preview:

- Homepage loads without a blank screen or missing styles.
- Desktop and mobile layouts are readable.
- Header links scroll to the correct sections.
- Dark-mode button works and persists after refresh.
- The three step cards remain visible when hovered.
- Free-guide buttons open the correct Google Form.
- The affiliate disclosure is visible beside the CTA.
- The Focusmate placeholder link is not treated as final until the real ID is available.
- `/privacy-policy/` loads.
- `/terms/` loads.
- A nonexistent address shows the custom 404 page.
- `/og-image.jpg` and `/pdf-guide.pdf` load.
- The browser console contains no errors.

Cloudflare normally adds `X-Robots-Tag: noindex` to preview deployments, preventing duplicate preview content from entering search results.

### 7. Promote the redesign to production

The safest method is a pull request:

1. Open a GitHub pull request from `astro-redesign` into `main`.
2. Confirm the Cloudflare preview check succeeds.
3. Review the preview once more.
4. Merge the pull request.

When the merge commit reaches the connected production branch, Cloudflare automatically starts a production build. The currently live site continues serving until the new build succeeds. Once successful, Cloudflare atomically switches the production domain to the Astro output.

Your existing custom domain and DNS records should not need to change because the same Pages project remains connected to the domain.

### 8. Verify the production deployment

After Cloudflare reports success:

1. Open the `pages.dev` production URL.
2. Open the custom domain.
3. Perform a hard refresh or use a private browser window.
4. Test the same routes and interactions used for the preview.
5. Confirm the deployment details show the expected Git commit.

Cloudflare may cache assets, but new Astro builds use hashed CSS filenames, which normally prevents visitors from receiving an old stylesheet.

## Rollback procedure

If the production redesign has a serious problem:

1. Open **Workers & Pages** in Cloudflare.
2. Select the project.
3. Open **Deployments** and then **All deployments**.
4. Find the last successful production deployment from before the Astro migration.
5. Open its three-dot actions menu.
6. Select **Rollback to this deployment** and confirm.

Cloudflare will immediately point production back to that successful deployment. Preview deployments cannot be selected as rollback targets.

After rollback, fix the problem on `astro-redesign`, push another preview, test it, and merge only after it passes.

## Common failure messages

### Cloudflare publishes the old `index.html`

Cause: the project still has no build command or publishes the repository root.

Fix:

- Build command: `npm run build`
- Output directory: `dist`

### Build succeeds but the site returns 404

Cause: the output directory is incorrect.

Fix: set it to `dist`, without pointing it to `src`, `public`, or the repository root.

### `astro: command not found`

Cause: dependencies were not installed or `package.json`/`package-lock.json` was not committed.

Fix: commit both package files and allow Cloudflare's normal dependency-install step to run.

### Unsupported Node version

Cause: an older Cloudflare build image or a conflicting `NODE_VERSION` environment variable is selected.

Fix:

- Use Cloudflare Pages build image v3.
- Remove an obsolete `NODE_VERSION` override, or set it to `22.16.0` or another version supported by Astro.
- Keep `.node-version` committed.

### CSS is missing

Cause: Cloudflare is publishing the wrong directory, or a stale HTML page is being served instead of Astro's build.

Fix: verify the published directory is `dist` and inspect the deployment commit.

### Privacy policy or terms return 404

Use the Astro routes with trailing-slash-compatible paths:

- `/privacy-policy/`
- `/terms/`

The footer already links to these routes.

### Cloudflare build fails after a package update

Do not delete `package-lock.json`. It pins the dependency versions tested locally. Run the local checks, commit the updated lockfile, and retry the preview deployment.

## Local checks before future deployments

Run:

```bash
npm install
npm run check
npm run build
```

A valid build creates these routes in `dist/`:

- `/index.html`
- `/privacy-policy/index.html`
- `/terms/index.html`
- `/404.html`

## After the migration is stable

Once the Astro production deployment has been stable for several days, you may remove the legacy root HTML files in a separate, reviewed commit. They do not currently interfere with Astro because Cloudflare publishes only `dist/`, so removing them is optional and should not be combined with the first production migration.

Keep the pre-Astro Git tag and Cloudflare deployment history until you are confident the redesign is stable.
