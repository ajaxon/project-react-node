const { send } = require('micro')
const { router, get } = require('microrouter')

module.exports = router(
  get('/', (req, res) => {
    const vin = req.query.vin
    
    const subscriptionLength = parseInt(req.query.subscriptionLength, 10)

    if (!vin) {
      return send(res, 400, { error: 'Invalid VIN' })
    }

    let price = 0
    if (subscriptionLength === 7) {
      price = 200
    } else if (subscriptionLength === 28) {
      price = 750
    } else {
      return send(res, 400, { error: 'Invalid subscription length' })
    }

    return {
      price
    }
  })
)
