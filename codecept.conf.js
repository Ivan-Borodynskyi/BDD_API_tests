exports.config = {
  output: './output',
  helpers: {
    REST: {
      endpoint: 'http://localhost:8080/v1/cleaning-sessions'
    },
    JSONResponse: {},
    Api: {
      require: './helpers/api_helper.js'
    }
  },
  include: {
    I: './bdd_tests/steps_file.js'
  },
  mocha: {
    reporterOptions: {
      reportDir: "output"
  }
  },
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './bdd_tests/features/*.feature',
    steps: ['./bdd_tests/step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: false
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './integration_tests/*.specs.js',
  name: 'bdd_api_tests'
}