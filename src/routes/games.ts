import express from "express";
import database from "../database/db";
import DateUtils from "../utils/dataUtils"

const GamesRoute = express.Router()
GamesRoute.get("/", async (request, response) => {
    const games = await database.games.findMany({
        include: {  
            /* FUNÇÃO COUNT */
            _count:{ 
                select:{
                    Ads: true
                }
            }
        }
    })
    return response.json(games)
})

GamesRoute.get("/:id/ads", async (request, response) => {
    const gameId = request.params.id
    const ads = await database.ads.findMany({
        where: {
            gameId: gameId
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: DateUtils.convertMinutesToHourString(ad.hourStart),
            hourEnd: DateUtils.convertMinutesToHourString(ad.hourEnd)
        }
    }))
})

GamesRoute.post("/:id/ads", async(request, response) =>{
    const gameId = request.params.id
    const body = request.body

    const ads = database.ads.create({
        data:{
            gameId: gameId,
            nickname: body.nickname,
            useVoiceChannel: body.useVoiceChannel,
            yearsPlaying: body.yearsPlaying,
            weekDays: body.weekDays.join(","),
            discord: body.discord,
            hourStart: DateUtils.convertStringHourToMinutes(body.hourStart),
            hourEnd: DateUtils.convertStringHourToMinutes(body.hourEnd)
        }
    })

    response.json(ads)
})

export default GamesRoute