module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRunner: "jest-circus/runner",
  testRegex: "(/.*|(\\.|/))\\.test\\.ts$",
  coveragePathIgnorePatterns: ["dist", "node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
