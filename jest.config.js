module.exports = {
  clearMocks: true,
  moduleFileExtensions: [`js`, `json`, `jsx`],
  setupFiles: [`<rootDir>/enzyme.config.js`],
  testEnvironment: `jsdom`,
  testMatch: [`**/?(*.)+(spec|test).js?(x)`],
  testPathIgnorePatterns: [`\\\\node_modules\\\\`],
  transformIgnorePatterns: [`<rootDir>/node_modules/`],
  verbose: false,
};
