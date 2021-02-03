// /Users/syeda/mongodb/bin/mongod.exe --dbpath=/Users/syeda/mongodb-data

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})