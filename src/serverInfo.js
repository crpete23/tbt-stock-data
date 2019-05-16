let durationAbbrev = [
    {name:'1m', value:'1 month', order:0},
    {name:'3m', value:'3 months', order:1},
    {name:'6m', value:'6 months', order:2},
    {name:'ytd', value:'year to date', order:3},
    {name:'1y', value:'1 year', order:4},
    {name:'2y', value:'2 years', order:5},
    {name:'5y', value:'5 years', order:6}
]

let serverInfo = {
    id: "stock-data",
    meta: {
        server: {
            name: 'Stock Data',
            description: 'Stock closing price data in US dollars',
            apiVersion: '0.2',
            baseURL: 'https://api.iextrading.com/1.0/stock/',
            attribution: {
                logo: '/logo.png',
                link: 'https://iextrading.com/developer/docs/#getting-started'
            }
        },
        availableDataSeries: {
            stock: {
                name: 'Closing Prices',
                description: 'Stock closing price data',
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
    },
    serviceUrl: "http://tributary.collineargroup.com:3011",
    status: {}
}

module.exports = {
    serverInfo
}