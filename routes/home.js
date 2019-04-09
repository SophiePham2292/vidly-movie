const express = require("express")
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "A vidly project",
        message: "Choe is amazing meo meo"
    })
})

module.exports = router;