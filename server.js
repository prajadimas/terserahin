// server.js

// ==================== BASIC SERVER SETUP ====================== //
// ============================================================== //

// Packages needed
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const place = require('./place/index')
const terserah = require('./terserah/index')

var app = express()

// setting up port used
// const port = process.env.PORT || 80
const port = process.env.PORT || 8989

// All configurations goes here
/* Configuration of the body-parser to get data from POST requests */
// app.use(bodyParser.json({limit: '1mb', extended: true}))
// app.use(bodyParser.urlencoded({limit: '1mb', extended: true}))
/* Configuration of the helmet security */
app.use(helmet())
app.use(cors())

// ================== ROUTES FOR API REQUESTS =================== //
// ============================================================== //

/*
 *

app.get('/', function (req,res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send({
    msg: 'Welcome to Terserah API'
  })
})

 *
 */

app.get('/', terserah)

// Register services
app.use('/place', place)
// app.use('/terserah', terserah)

// ====================== SERVER STARTER ======================== //
// ============================================================== //

// listening server
app.listen(port, '0.0.0.0', () => {
	console.log(`Terserah has started on port ${port}`)
})

// Export our app for testing purposes
module.exports = app
