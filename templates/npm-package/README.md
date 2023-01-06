<!--- TODO: update this readme file -->

# npm-package

### Configuration

- Node v18.12.1, pnpm
- Vite for bundling in `es` and `cjs` formats
- Prettier and Eslint with custom rules for formatting and linting
- Husky, lint-staged and commitlint configs for clean linted commits
- Custom config for automated publishing to NPM with [release-it](https://github.com/release-it/release-it) and creating GitHub releases
- GitHub Actions to validate PR's and pushes to `main`
- GitHub PR and Issue Templates
- [Renovate Bot](https://github.com/renovatebot/renovate) for automated dependency management

### Setting up

- Do a quick search for all the `TODO:` comments across the template and follow the instructions.
- `pnpm install` for installing all dependencies.
- `pnpm build` for creating the production build in `/dist`.
- `pnpm build:watch` to run build in watch mode to easily test the package.
- You can refer to the `scripts` field in `package.json` to see the list of tasks.

### Publishing
- Make sure the working directory is clean and upto date with remote.
- Run `pnpm release` this will launch `release-it`, now select the appropriate options in the terminal (eg. semver - major, minor, patch)
- The package will be published to NPM and a draft release will be created on GitHub. You can update the changelog and release the new version from GitHub's releases page.
