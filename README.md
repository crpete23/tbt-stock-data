# Collinear Coding Challenge Backend

## About
  Collinear Coding Challenge Backend is a Microservice Starter, created as a solution to the Collinear Coding Challenge.

### Description
  - This Data Microservice API has one built out API with time-series data from Apple's monthly stock closing price

### Routes

  - Header
    - Content-Type: application/json

##### Microservice routes

| Purpose | Request Type | Route | body |
| --- | --- | --- | --- |
| get microservice API information | `get` | http://localhost:3200/ | - |

##### Apple Monthly Closing Data routes

| Purpose | Request Type | Route | body |
| --- | --- | --- | --- |
| get all monthly data | `get` | http://localhost:3200/api/applMonthlyClosingData/ |

Returns
* `format` `<string>`
* `initialDataSet` `[][]` - Array of tuples
    * `tuple[0]` `<number>` - epoch time of data (Unix Time, US Market Close)
    * `tuple[1]` `<number>` - data value (In US Dollars)


| get single date data from initialDataSet | `get` | http://localhost:3200/api/applMonthlyClosingData/:date |

Format
* :date formatted as YYYY-MM-DD

Returns
* `format` `<string>`
* `data` `[][]` - tuple
    * `tuple[0]` `<number>` - epoch time of data (Unix Time, US Market Close)
    * `tuple[1]` `<number>` - data value (In US Dollars)

#### Published Testing with Postman:
https://documenter.getpostman.com/view/4658545/RztmqU1B

## Installation

1. Fork and/or Clone this repository

1. `npm install`

## Running Dev Server

1. `npm run dev`
