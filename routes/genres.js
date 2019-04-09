const express = require("express")
const router = express.Router();

router.get("", (req, res) => {
    res.send(movies)
})

router.get("/:id", (req, res) => {
    const movieFound = movies.find(m => m.id === parseInt(req.params.id))
    if (!movieFound) return res.status(404).send("Movie with given id is not found")
    res.send(movieFound)
})

router.post("", (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const movie = {
        id: movies.length + 1,
        name: req.body.name
    }
    movies.push(movie)
    res.send(movie)
})

router.put("/:id", (req, res) => {
    let movie = movies.find(m => m.id === parseInt(req.params.id))
    if (!movie) return res.status(404).send("Movie with given id is not found")

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    movie.name = req.body.name
    console.log(movies)
    res.send(movie)
})

router.delete("/:id", (req, res) => {
    let movie = movies.find(m => m.id === parseInt(req.params.id))
    if (!movie) return res.status(404).send("Movie with given id is not found")

    const movieIndex = movies.indexOf(movie)
    movies.splice(movieIndex, 1)

    //movies = movies.filter(m => m.id === parseInt(req.params.id))
    res.send(movies)
})

function validateGenre(input) {
    const inputSchema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(input, inputSchema)
}

module.exports = router;