const moviesControllers = {}
const Movie = require('../models/movie')
const Director = require('../models/director')

moviesControllers.all = async (req, res) => {
    try {
        const moviesDB = await Movie.find()

        const movies = await Promise.all(moviesDB.map( async movie => {
            const buffer = movie.image
            const base64 = Buffer.from(buffer).toString('base64');
            const image = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

            const directorDB = await Director.findOne({ _id: movie.directorId })

            return {
                id: movie.id,
                title: movie.title,
                description: movie.description,
                duration: movie.duration,
                director: directorDB.name,
                image
            }
        }))

        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json(error)
    }
}

moviesControllers.detail = async (req, res) => {
    try {
        const { id } = req.params

        const movieDB = await Movie.findById(id)

        const buffer = movieDB.image
        const base64 = Buffer.from(buffer).toString('base64');
        const image = `data:image/png;base64,${Buffer.from(base64, 'base64').toString()}`;

        const directorDB = await Director.findOne({ _id: movieDB.directorId })

        const movieData = {
            id: movieDB.id,
            title: movieDB.title,
            duration: movieDB.duration,
            director: directorDB.name,
            description: movieDB.description,
            image
        }

        res.status(200).json(movieData)
    } catch (error) {
        res.status(500).json(error)
    }
}

moviesControllers.add = async (req, res) => {
    try {
        const { title, description, duration, directorId } = req.body
        const imageBuffer = req.files[0].buffer
        const image = imageBuffer.toString("base64");

        const newMovie = new Movie({
            title,
            description,
            duration,
            directorId,
            image
        })

        await newMovie.save()

        res.status(200).json('Movie created')
    } catch (error) {
        res.status(500).json(error)
    }
}

moviesControllers.edit = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, duration, directorId } = req.body
        let image = undefined;

        if (req.files && req.files.length > 0) {
            const imageBuffer = req.files[0].buffer
            image = imageBuffer.toString("base64");
        }

        await Movie.findByIdAndUpdate(id, {
            title: title ? title : undefined,
            description: description ? description : undefined,
            duration: duration ? duration : undefined,
            directorId: directorId ? directorId : undefined,
            image
        })

        res.status(200).json('Movie edited')
    } catch (error) {
        res.status(500).json(error)
    }
}

moviesControllers.destroy = async (req, res) => {
    try {
        const { id } = req.params

        await Movie.findByIdAndDelete(id)

        res.status(200).json('Movie deleted')
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = moviesControllers