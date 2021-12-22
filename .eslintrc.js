module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-empty-interface": "off",
      },
    },
  ],
};
