import express from "express";
import AdsRoute from "./routes/ads";
import GamesRoute from "./routes/games";
import cors from 'cors'
import HttpCodes from "./constants/HttpCodes";
import UsersRoute from "./routes/users";
const app = express()

app.use(cors())

app.use(express.json())
app.use('/ads', AdsRoute)
app.use('/games', GamesRoute)
app.use('/users', UsersRoute)

app.use((request, response, next) => {
    response.status(HttpCodes.NotFound).send()
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {console.log(`Server is running in port: ${PORT}`)})