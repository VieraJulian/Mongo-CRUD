const mongoose = require('mongoose')

const url = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log('Connected to database')).catch(err => console.log('Error connecting'))