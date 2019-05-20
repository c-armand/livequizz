require('dotenv').config()

const dbConfig = {
  host: process.env.DATABASE_URL
}

module.exports = dbConfig
