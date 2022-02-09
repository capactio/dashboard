module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      // ignore empty interfaces for React components
      files: ["*.tsx"],
      rules: {
        "@typescript-eslint/no-empty-interface": "off",
      },
    },
  ],
  ignorePatterns: ["generated", "coverage", "build", "dist"],
};
