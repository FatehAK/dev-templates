<!--- TODO: update this readme file -->

# pro-vanilla

### Configuration

- Node v18.12.1, [pnpm](https://pnpm.io/)
- [Vite](https://vitejs.dev/) for bundling with plugins for optimizing images and minification
- Prettier, Stylelint and Eslint with custom rules for formatting and linting
- [Husky](https://typicode.github.io/husky/#/), [lint-staged](https://www.npmjs.com/package/lint-staged) and [commitlint](https://github.com/Zhengqbbb/cz-git) configs for clean linted commits
- PostCSS plugins and [modern-normalize](https://github.com/sindresorhus/modern-normalize) for CSS reset
- PWA Configuration (optional) and SEO optimization
- GitHub Actions for CI/CD
- GitHub PR and Issue templates
- [Renovate Bot](https://github.com/renovatebot/renovate) for automated dependency management
- [Cloudflare Pages](https://pages.cloudflare.com/) for publishing

### Setting up

- Do a quick search for all the `TODO:` comments across the template and follow the instructions.
- `pnpm install` for installing all dependencies.
- `pnpm start` to start the dev server.
- `pnpm build:prod` for creating the production build.
- Linting happens parallely, you can refer to the `scripts` field in `package.json` to see the list of tasks.

### Deployment
- Each push to `main` will run the GitHub action to trigger a deployment after the lint and build jobs have passed. The changes will be published to Cloudflare's `production` environment.
- Pushes to `feature` branches (i.e other than main) will trigger a deployment to Cloudflare's `preview` environment.
- PR's for the main branch are validated by a separate action `validate_pr`
