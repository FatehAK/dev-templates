<!--- TODO: update this readme file -->

# node-cli

### Configuration

- Node v18.12.1, [pnpm](https://pnpm.io/)
- [Vite](https://vitejs.dev/) for bundling in `es` format and CLI configuration
- Prettier and Eslint with custom rules for formatting and linting
- [Husky](https://typicode.github.io/husky/#/), [lint-staged](https://www.npmjs.com/package/lint-staged) and [commitlint](https://github.com/Zhengqbbb/cz-git) configs for clean linted commits
- Custom config for automated publishing to NPM with [release-it](https://github.com/release-it/release-it) and creating GitHub releases
- Preinstalled recommended packages for developing cross-platform CLI tools
- GitHub Actions to validate PR's and pushes to `main`
- GitHub PR and Issue templates
- [Renovate Bot](https://github.com/renovatebot/renovate) for automated dependency management

### Setting up

- Do a quick search for all the `TODO:` comments across the template and follow the instructions.
- `pnpm install` for installing all dependencies.
- `pnpm build` for creating the production build in `/dist`.
- Run `pnpm build:watch` in one terminal tab and in another tab run `node .` to test your CLI locally.
- Install your CLI tool as a global dependency by `npm install -g .` for testing
- You can refer to the `scripts` field in `package.json` to see the list of tasks.

### Recommended Packages
(* indicates preinstalled)
- [pathe*](https://www.npmjs.com/package/pathe) - Cross-platform support for paths (replaces Node's `path`)
- [fs-extra*](https://www.npmjs.com/package/fs-extra) - Async file operations and error handling (replaces Node's `fs` and `fs/promises`)
- [inquirer](https://www.npmjs.com/package/inquirer) - Simplest way to query user input interactively
- [execa*](https://www.npmjs.com/package/execa) - Promise based shell command executor
- [minimist*](https://www.npmjs.com/package/minimist) - Parses CLI arguments and define aliases
- [minimatch](https://www.npmjs.com/package/minimatch) - Glob expression matcher
- [ansi-colors*](https://www.npmjs.com/package/ansi-colors) - Colorizing terminal output, much lighter than `chalk`
- [nanospinner](https://www.npmjs.com/package/nanospinner) - Lightweight spinner for async tasks

### Publishing
- Make sure the working directory is clean and upto date with remote.
- Run `pnpm release` this will launch `release-it`, now select the appropriate options in the terminal (eg. semver - major, minor, patch)
- The package will be published to NPM and a draft release will be created on GitHub. You can update the changelog and release the new version from GitHub's releases page.
