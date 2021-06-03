module.exports = {
  verbose: true,
  collectCoverage: false,
  testEnvironment: "node",
  coverageDirectory: "./coverage",
  transform: { "\\.js$": ["babel-jest"] }
};
