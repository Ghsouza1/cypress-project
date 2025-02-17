const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 500,
  viewportWidth: 700,
  projectId: "yja1wt",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
});
