const express = require("express")
const Joi = require("joi")
const Customer = require("../data/models/customer")

const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = new Customer({
        ...req.body
    })

    res.send(await customer.save())
})

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const updateResult = await Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            ...req.body
        }
    }, { new: true })

    res.send(updateResult)
})

router.get("/", async (req, res) => {
    res.send(await Customer.find())
})

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send("Customer is not found")
    res.send(customer)
})

router.delete("/:id", async (req, res) => {
    res.send(await Customer.findByIdAndDelete(req.params.id))
})

function validate(input) {
    const schema = {
        name: Joi.string().required(),
        isGold: Joi.boolean(),
        phone: Joi.number().required()
    }

    return Joi.validate(input, schema)
}

module.exports = router;