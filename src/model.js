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

//Data from this web service is updated every hour on the hour. If the hour when the data was retrieved and the current hour do not match, then the data has been updated
//and the cache should be cleared for those records.
function clearCache() {
    let now = new Date();
    Object.keys(cachedData).forEach(key => {
        let retrievedTimePlusDay = new Date(cachedData[key].retrievalTime.getTime() + 1 * 86400000)
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