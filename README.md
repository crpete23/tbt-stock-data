# tbt-stock-data API

## About
  Tbt-stock-data-API formats stock closing data from the free https://iextrading.com/developer/docs/#getting-started API
  into digestible time-series data (unix time, stock closing in USD)

### Description
  - Retrieve time-series data by providing a stock ticker and chart duration

### Routes

  - Header
    - Content-Type: application/json

##### Microservice routes

| Purpose | Request Type | Route | body |
| --- | --- | --- | --- |
| get microservice API information | `get` | http://localhost:3200/ | - |

##### Stock Closing Time-Series Data routes

| Purpose | Request Type | Route | body | queryParams |
| --- | --- | --- | --- | --- |
| get all time-series data | `get` | http://localhost:3200/api/stock/?stock=AAPL&duration=1m | - | stock (ticker, required), duration (1m, 3m, 6m, ytd, 1y, 2y, 5y, defaults to 1m) |

Returns
* `format` `<string>`
* `units` `{}`
* `initialDataSet` `[][]` - Array of tuples
    * `tuple[0]` `<number>` - epoch time of data (Unix Time, US Market Close)
    * `tuple[1]` `<number>` - data value (In US Dollars)

## Installation

1. Fork and/or Clone this repository

1. `npm install`

## Running Dev Server

1. `npm run dev`
