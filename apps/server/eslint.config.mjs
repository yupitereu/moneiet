import eslintConfig from '@repo/project-config/lint/eslint.config.mjs';

export default [
  ...eslintConfig,
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      next: {
        rootDir: process.cwd(),
      },
    },
  },
];
