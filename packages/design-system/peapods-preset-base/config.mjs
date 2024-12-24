export default {
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'variables.ts',
          format: 'javascript/esm',
          options: {
            minify: true,
          },
        },
        {
          destination: 'variables.mjs',
          format: 'javascript/esm',
          options: {
            minify: true,
            moduleFormat: 'esm',
          },
        },
      ],
    },
    json: {
      transformGroup: 'web',
      buildPath: 'dist/',
      files: [
        {
          destination: 'variables.json',
          format: 'json/nested',
        },
      ],
    },
  },
};
