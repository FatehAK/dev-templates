const prettierCmd = `prettier --loglevel warn --cache --cache-strategy content --cache-location ./node_modules/.cache/.prettiercache --write`;

// TODO: by default eslint and stylelint expect no warnings in commited code, adjust `--max-warnings` to change this behaviour
const stylelintCmd = `stylelint --max-warnings=0 --custom-formatter=node_modules/stylelint-formatter-pretty --aei --cache --cache-strategy content --cache-location ./node_modules/.cache/.stylelintcache --fix`;
const eslintCmd = `eslint --max-warnings=0 --format=pretty --cache --cache-strategy content --cache-location ./node_modules/.cache/.eslintcache --fix`;

module.exports = {
  // prevent linting styles.js in the first step since lint-staged runs in parallel
  // and we want to run stylelint for them and this avoid race conditions as well
  '**/!(*styles).js': [eslintCmd, prettierCmd],
  '**/*.{styles.js,jsx}': [eslintCmd, stylelintCmd, prettierCmd],
  '**/*.html': [eslintCmd, stylelintCmd, prettierCmd],
  '**/*.css': [stylelintCmd, prettierCmd],
  '**/*.{md,json}': [prettierCmd],
};
