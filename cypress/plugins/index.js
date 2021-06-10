const { setupDb } = require('./setupDb')

module.exports = (on, config) => {
  on('task', {
    setupDb
  })
}
