const { send } = require('micro')
const { router, get } = require('microrouter')

module.exports = router(
  get('/vehicles', (req, res) => {
    const vehicles = [
      {"description": "2006 Honda Accord", "odometer": 25567}
    ]

    // TODO: Return list of vehicles

    return {
      vehicles
    }
  })
)
