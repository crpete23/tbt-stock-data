const model = require('./model')
const { serverInfo } = require('./serverInfo')
let { cachedData } = require('./model')

function baseRoute (req, res){
    serverInfo.meta.server.attribution.logo = `http://${req.headers.host}/logo.png`
    res.json(serverInfo)
}

function validateDuration(duration){
    //is there an option.name (from the duration option list) that matches the arg. Returns undefined if nothing is found
    const found = (serverInfo.meta.availableDataSeries.stock.attributes.duration.values.find((option)=>{
        return option.name === duration
    }))
    return found!==undefined
}

function validateTicker(ticker){
    //filter to see if ticker is already in cached data
    const found = Object.keys(cachedData).find((key)=>{
        //keys are formatted as `ticker_duration_series`
        return key.split('_')[0]===ticker
    })
    if(!found){
        return model.getTickerCompanyData(ticker)
        .then((res)=>{
            //has company data for ticker
            return true
        })
        .catch((err) => {
            //no company data for that ticker
            return false
        })
    } else {
        return true
    }

}

async function checkSeries (req, res){
    const series = req.params.series

    if(series==='stock'){
        let ticker = req.query.stock
        let duration = req.query.duration
        console.log(`Requesting data for ticker: ${ticker}, duration: ${duration}`)

        if(!ticker || !duration){
            console.log('ERROR, ticker and duration params are required')
            res.status(400).send({ errors: 'Stock ticker and duration parameters are required.'})
            return
        } else { //make ticker and duration lower case to be uniform
            ticker = ticker.toLowerCase()
            duration = duration.toLowerCase()
        }

        const isTickerValid = await validateTicker(ticker)

        const isDurationValid = validateDuration(duration)

        if(!isTickerValid || !isDurationValid){
            let errorStringArr = []
            if(!isTickerValid){
                errorStringArr.push(`${ticker} is not a valid stock ticker`)
            }
            if(!isDurationValid){
                errorStringArr.push(`${duration} is not a valid duration option`)
            }
            let errorStr = errorStringArr.join(', ')
            console.log('ERROR', errorStr)
            res.status(400).send({ errors: errorStr})
            return
        }

        if(!cachedData[`${ticker}_${duration}_${series}`]) {
            console.log(`Populate data series for ${ticker} (${duration} chart) from stocks API`)
            model.obtainMonthlyData(ticker, duration, series)
                .then((seriesData) => {
                    res.json(seriesData)
                })
                .catch((err) => {
                    console.log("failed loading data", err)
                    res.status(400).send({ errors: 'Bad Request'})
                })
        } else {
            res.json(cachedData[`${ticker}_${duration}_${series}`].seriesData)
        }
    } else {
        console.log(`No path found for series: ${series}`)
        res.status(404).send({ errors: `Could not ${req.method} ${req.url}`})
    }
}

module.exports = {
    baseRoute,
    checkSeries
}
