const model = require('../models/applMonthlyClosingData')
const resourceName = 'initialDataSet'

async function getAll(req, res, next){
  try{
    const response = await model.getAll()
    var modified = response.data.map((object)=>{
      return ([new Date(`${object.date} 01:00:00`).getTime(), object.close])
    })
    res.status(200).json({
      format: 'date',
      [resourceName]: modified
    })
  } catch (e){
    console.log(e)
    next({status:400, error: 'Unable to find the specified stock data'})
  }
}

module.exports = {
  getAll
}
