import express from "express";
import HttpCodes from "../constants/HttpCodes";
import database from "../database/db";

const UsersRoute = express.Router()

UsersRoute.post("/", async(request, response, next) => {
    try {
        const body = request.body
        const userExists = await database.users.count({
            where: {
                email: body.email
            }
        }) > 0

        if(userExists)
            return response.sendStatus(HttpCodes.BadRequest)
        else{
            await database.users.create({
                data: {
                    email: body.email,
                    username: body.username,
                    password: body.password
                }
            })

            return response.sendStatus(HttpCodes.Created)
        }        
    } catch (error) {
        return response.status(HttpCodes.ServerError).send({mensagem: "Erro ao gravar anúncio"})
    }
})

UsersRoute.post("/auth", async (request, response) =>{
    const email = request.query.email
    const password = request.query.password

    if((email == null) || (password == null)) return response.sendStatus(HttpCodes.BadRequest)
   
    const user = await database.users.findFirst({
        where: {
            OR: [
                {
                    username: String(email)
                },
                {
                    email: String(email)
                }
            ]
        }
    })

    if(user == null) return response.sendStatus(HttpCodes.NotFound)

    if(user.password === password) return response.status(HttpCodes.OK).json({
        id: user.id,
        email: user.email,
        username: user.username
    })
    else return response.sendStatus(HttpCodes.Unauthorized)
})

export default UsersRoute