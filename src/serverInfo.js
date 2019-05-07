let durationAbbrev = {
    '1m':'1 month',
    '3m':'3 months',
    '6m':'6 months',
    'ytd': 'year to date',
    '1y': '1 year',
    '2y': '2 years',
    '5y': '5 years'
}

let serverInfo = {
    server: {
        name: 'Stock Data',
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
                    name: 'Stock',
                    description: 'Recognized Stock Ticker ex. AAPL'
                },
                duration: {
                    name: 'Chart',
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