let durationAbbrev = {
    '01_1m':'1 month',
    '02_3m':'3 months',
    '03_6m':'6 months',
    '04_ytd': 'year to date',
    '05_1y': '1 year',
    '06_2y': '2 years',
    '07_5y': '5 years'
}

let serverInfo = {
    server: {
        name: 'Stock Data',
        description: 'Stock closing price data in US dollars',
        apiVersion: '0.2',
        baseURL: 'https://api.iextrading.com/1.0/stock/',
        attribution: {
            logo: '/logo.png',
            link: 'https://client.schwab.com/'
        }
    },
    availableDataSeries: {
        stock: {
            name: 'Monthly Stock Closing Data',
            description: 'Stock closing price data for the last month',
            attributes: {
                stock: {
                    name: 'stock',
                    description: 'Recognized Stock Ticker ex. AAPL'
                },
                duration: {
                    name: 'chart duration',
                    description: 'Chart Duration Length',
                    type: 'select-map',
                    values: durationAbbrev
                }
            }
        }
    }
}

module.exports = {
    serverInfo
}