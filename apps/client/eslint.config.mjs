import eslintConfig from '@repo/project-config/lint/eslint.config.mjs';

export default [
  ...eslintConfig,
  {
    settings: {
      react: {
        version: 'detect'
      },
      next: {
        rootDir: process.cwd()
      }
    }
  }
];
