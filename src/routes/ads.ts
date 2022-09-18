import express from "express";
import HttpCodes from "../constants/HttpCodes";
import database from "../database/db";
import DateUtils from "../utils/dataUtils";

const AdsRoute = express.Router()
AdsRoute.get("/:id/discord", async (request, response) => {
    const adId = request.params.id
    const ad = await database.ads.findUnique({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    if(ad !== null)
        return response.json({
            discord: ad.discord
        })
    else
        return response.status(HttpCodes.NotFound).send({
            message: "Ad not found"
        });
})

AdsRoute.post("/", async (request, response) => {
    const body = request.body
    const game = await database.games.findUnique({
        where: {
            id: body.gameId
        }
    })

    if(game == null)
        return response.status(HttpCodes.NotFound).send({mensagem: "Game não encontrado"})
    else{
        try {
            const ad = {
                ...body,
                weekDays: (body.weekDays as Number[]).toString(),
                hourStart: DateUtils.convertStringHourToMinutes(body.hourStart),
                hourEnd: DateUtils.convertStringHourToMinutes(body.hourEnd)
            }
            
            await database.ads.create({
                data: ad
            })
            return response.status(HttpCodes.Created).send()
        } catch (error) {
            return response.status(HttpCodes.ServerError).send({mensagem: "Erro ao gravar anúncio"})
        }
    }
})

export default AdsRoute