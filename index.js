const express = require("express")
const config = require("config")
const morgan = require("morgan")
const homeRouter = require("./routes/home")
const genreRouter = require("./routes/genres")
const customerRouter = require("./routes/customers")

const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => console.log("Connect to Vidly db"))


const app = express()

if (app.get("env") === "development") {
    console.log("morgan enabled")
    app.use(morgan("tiny"))
}

app.set("view engine", "pug");
app.set("views", "./views");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/", homeRouter)
app.use("/api/genres", genreRouter)
app.use("/api/customers", customerRouter)



const port = process.env.PORT || "3000"

app.listen(port, () => console.log(`App running on port ${port}`))