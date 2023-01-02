const prettierCmd = `prettier --loglevel warn --cache --cache-strategy content --cache-location ./node_modules/.cache/.prettiercache --write`;

// TODO: by default eslint and stylelint expect no warnings in commited code, adjust `--max-warnings` to change this behaviour
const stylelintCmd = `stylelint --max-warnings=0 --custom-formatter=node_modules/stylelint-formatter-pretty --aei --cache --cache-strategy content --cache-location ./node_modules/.cache/.stylelintcache --fix`;
const eslintCmd = `eslint --max-warnings=0 --format=pretty --cache --cache-strategy content --cache-location ./node_modules/.cache/.eslintcache --fix`;

module.exports = {
  '**/*.js': [eslintCmd, prettierCmd],
  '**/*.html': [stylelintCmd, eslintCmd, prettierCmd],
  '**/*.css': [stylelintCmd, prettierCmd],
  '**/*.{md,json}': [prettierCmd],
};
