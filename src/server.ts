import express from "express";
import AdsRoute from "./routes/ads";
import GamesRoute from "./routes/games";
import cors from 'cors'
import HttpCodes from "./constants/HttpCodes";
const app = express()

app.use(cors())

app.use(express.json())
app.use('/ads', AdsRoute)
app.use('/games', GamesRoute)
app.use((request, response, next) => {
    response.status(HttpCodes.NotFound).send()
})

app.listen(process.env.PORT || 5000)