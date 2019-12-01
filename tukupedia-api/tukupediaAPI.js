const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const cors = require ('cors')
const routers = require('./routers')

const port = process.env.PORT || 4050

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(cors())

app.get('/', (req, res) => res.send("Welcome to Tukupedia API"))
app.get('/favicon.ico', (req, res) => res.status(204))

app.use(routers.userRouter)
app.use(routers.productRouter)
app.use(routers.cartRouter)

app.listen(port, () => console.log("Server up in port " + port))