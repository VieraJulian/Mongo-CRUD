const express = require('express')
const app = express()
const { port, start } = require('./modules/port')
require('dotenv').config();
require('./db/mongooseconections')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.listen(port, start)

app.use('/movies', require('./routes/movies.routes'))
app.use('/directors', require('./routes/directors.routes'))