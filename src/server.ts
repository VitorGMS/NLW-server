import express from "express";
import AdsRoute from "./routes/ads";
import GamesRoute from "./routes/games";
import cors from 'cors'
const app = express()

app.use(cors())

app.use(express.json())
app.use('/ads', AdsRoute)
app.use('/games', GamesRoute)


app.listen(process.env.PORT || 5000)