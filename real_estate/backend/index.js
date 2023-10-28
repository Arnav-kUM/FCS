const connectToMongo = require("./db")
const express = require('express')
const User= require('./models/Users');
const property= require('./models/Property');

connectToMongo();
const app = express()
const port = 3000
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/property',require('./routes/property'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})