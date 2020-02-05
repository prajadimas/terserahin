const axios = require('axios')
require('dotenv').config()

const getRandomResult = require('../modules/getRandomResult')

module.exports = function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
  // var lat = req.query.lat
  // var lng = req.query.lng
  // -6.8926586,107.6096026 (200)
  var radChosen = req.query.rad || '500'
  let mapsURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + req.query.lat + ',' + req.query.lng + '&radius=' + radChosen + '&types=restaurant&key=' + process.env.API_KEY
  axios.get(mapsURL)
  .then(data => {
    console.log(data.data.results)
    var openedNow = []
    if (data.toString().includes('exceeded your daily request quota for this API')) {
      res.status(200).json({
        msg: 'OK',
        data: null
      })
    } else {
      // hasil = data.data.results
      getRandomResult(data.data.results).then(chosen => {
        // console.log(chosen)
        if (chosen) {
          var ratingChosen
          chosen.rating ? ratingChosen = chosen.rating : ratingChosen = null
          var chosenPlace = {
            name: chosen.name,
            location: chosen.geometry.location,
            placeId: chosen.place_id,
            rating: ratingChosen
          }
          res.status(200).json({
            msg: 'OK',
            data: chosenPlace
          })
        } else {
          res.status(200).json({
            msg: 'OK',
            data: false
          })
        }
      })
    }
  })
  .catch(err => {
    console.log('error: ', err)
    res.status(500).json({
      msg: 'Internal Server Error'
    })
  })
}
