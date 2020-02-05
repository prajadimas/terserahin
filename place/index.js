const { Router } = require('express')
const getRestaurant = require('./getRestaurant')

const routes = Router()

routes.get('/restaurant', getRestaurant)

module.exports = routes
