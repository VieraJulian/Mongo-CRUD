const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    image: {
        type: Buffer
    },
    directorId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Movie', movieSchema)