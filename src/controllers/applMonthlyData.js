const model = require('../models/applMonthlyData')
const resourceName = 'data'

async function getAll(req, res, next){
  try{
    const response = await model.getAll()
    res.status(200).json({
      [resourceName]: response.data
    })
  } catch (e){
    console.log(e)
    next({status:400, error: 'Unable to find the specified stock data'})
  }
}

module.exports = {
  getAll
}
