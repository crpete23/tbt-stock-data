const axios = require('axios');
let serverInfo = require('./serverInfo').serverInfo;
let cachedData = {};

function obtainMonthlyData(ticker, duration, series) {
    let url = `https://api.iextrading.com/1.0/stock/${ticker}/chart/${duration}`
    console.log(`retrieving data from stock api: ${url}`)
    
    return axios.get(url)
        .then(res => {
            let cache = {
                retrievalTime: new Date(),
                seriesData: {
                    units: {},
                    format: '',
                    initialDataSet: []
                }
            }

            cachedData[`${ticker}_${duration}_${series}`] = cache

            if (series === 'stock'){
                cache.seriesData.units.name = "Dollars"
                cache.seriesData.units.description = "US Dollars"
                cache.seriesData.units.abbreviation = "$"
                cache.seriesData.format = "time"
            }

            res.data.forEach((object) => {
                let timestamp = new Date(`${object.date} 01:00:00`).getTime()
                if(series === 'stock'){
                    cache.seriesData.initialDataSet.push([timestamp, object.close])
                }
            })
            return cache.seriesData
        })
}

//Clears cached data point after a day because data is refreshed daily
function clearCache() {
    let now = new Date();
    Object.keys(cachedData).forEach(key => {
        let retrievedTimePlusDay = new Date(cachedData[key].retrievalTime.getTime() + 1 * 86400000) //1 day: 1000ms*60s*60min*24hours
        if (retrievedTimePlusDay < now) { //clears cachedData after one day to retrieve new data
            delete cachedData[key];
        }
    });
}

module.exports = {
    cachedData,
    clearCache,
    obtainMonthlyData
};