const axios = require('axios')
const getURL = 'https://api.iextrading.com/1.0/stock/aapl/chart/1m'

function getAll(){
  return axios.get(`${getURL}`)
}

module.exports = {
  getAll
}
