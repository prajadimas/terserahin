const { Router } = require('express')
const getChosenLocation = require('./getChosenLocation')

const routes = Router()

routes.get('/', getChosenLocation)

module.exports = routes
