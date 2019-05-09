const model = require('./model')
const { serverInfo } = require('./serverInfo')
let { cachedData } = require('./model')

function baseRoute (req, res){
    serverInfo.meta.server.attribution.logo = `http://${req.headers.host}/logo.png`
    res.json(serverInfo)
}

function checkSeries (req, res){
    const series = req.params.series
    const ticker = req.query.stock
    const duration = req.query.duration || '1m'

    console.log(`ticker: ${ticker}`)

    if(!ticker){
        res.status(400).send({ errors: 'Stock ticker parameter is required.'})
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
                res.status(400).send(err)
            })
    } else {
        res.json(cachedData[`${ticker}_${duration}_${series}`].seriesData)
    }
}

module.exports = {
    baseRoute,
    checkSeries
}
