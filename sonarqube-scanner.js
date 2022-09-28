const scanner = require('sonarqube-scanner');
scanner(
  {
  serverUrl: "https://sonarcloud.io",
  token:"0c85737906af7e646b8a91b8f8fe30648a6ca5e1",
  options: {
    "sonar.sources": "./src",
    "sonar.organization": "luismateoh",
    "sonar.exclusions": "**/reportWebVitals.js",
    "sonar.coverage.exclusions": "**/reportWebVitals.js, **/setupTests.js, **/*.test.js",
    "sonar.tests": "./src",
    "sonar.test.inclusions": "**/*.test.js,**/*.test.jsx",
    "sonar.testExecutionReportPaths": "test-report.xml",
    "sonar.javascript.lcov.reportPaths": "coverage/lcov.info"
  },
},
() => process.exit()
);