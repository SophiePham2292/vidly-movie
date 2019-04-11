const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: Number
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer