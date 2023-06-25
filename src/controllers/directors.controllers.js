const directorsControllers = {}
const Director = require('../models/director')
const Movies = require('../models/movie')

directorsControllers.all = async (req, res) => {
    try {
        const directorsDB = await Director.find()

        const directors = await Promise.all(directorsDB.map( async director => {
            const moviesDB = await Movies.find({ directorId: director.id })

            const moviesTitles = moviesDB.map(movie => { return movie.title})

            return {
                id: director.id,
                name: director.name,
                age: director.age,
                birth: director.birth,
                movies: moviesTitles
            }
        }))

        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json(error);
    }
}

directorsControllers.create = async (req, res) => {
    try {
        const { name, age, birth } = req.body

        const newDirector = new Director({ name, age, birth })

        await newDirector.save()

        res.status(200).json('Director created');
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = directorsControllers