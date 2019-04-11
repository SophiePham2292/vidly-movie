const express = require("express")
const router = express.Router();
const Genre = require('../data/models/genre')
const Joi = require("joi")


router.get("/", async (req, res) => {
    res.send(await Genre.find())
})

router.get("/:id", async (req, res) => {
    const movieFound = await Genre.findById(req.params.id)
    if (!movieFound) return res.status(404).send("Movie with given id is not found")
    res.send(movieFound)
})

router.post("/", async (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const movie = new Genre({
        name: req.body.name
    })
    const savedMovie = await movie.save()
    res.send(savedMovie)
})

router.put("/:id", async (req, res) => {
    let genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send("genre with given id is not found")

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(await genre.save())
})

router.delete("/:id", async (req, res) => {
    let genre = await Genre.findByIdAndDelete(req.params.id)

    res.send(genre)
})

function validateGenre(input) {
    const inputSchema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(input, inputSchema)
}

module.exports = router;