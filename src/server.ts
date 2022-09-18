import express from "express";
import AdsRoute from "./routes/ads";
import GamesRoute from "./routes/games";
import cors from 'cors'
const app = express()

app.use(cors())

app.use(express.json())
app.use('/api/ads', AdsRoute)
app.use('/api/games', GamesRoute)


app.listen(5000)