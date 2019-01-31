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
    next({status:400, error: 'Unable to find the specified stock data'})
  }
}

async function getDate(req, res, next){
  try{
    const unix = new Date(`${req.params.date} 01:00:00`).getTime()

    const data = await model.getAll()

    var response = data.data.map((object)=>{
      return ([new Date(`${object.date} 01:00:00`).getTime(), object.close])
    })

    const [modified] = response.filter(dataSet => dataSet[0]===unix)

    res.status(200).json({
      format: 'date',
      ['data']: modified
    })
  } catch (e){
    console.log(e)
    next({status:400, error: 'Unable to find the specified stock data date'})
  }
}

module.exports = {
  getAll,
  getDate
}
