import { PrismaClient } from '@prisma/client'
import { GamesDefault } from '../constants/Games'
const database = new PrismaClient()


async function main() {
    for (const game of GamesDefault) {
        try {
            await database.games.upsert({
                create: {
                    id: game.id,
                    title: game.title,
                    bannerUrl: game.bannerUrl
                },
                update: {
                    title: game.title,
                    bannerUrl: game.bannerUrl
                },
                where: {
                    id: game.id
                }        
            })
    
            console.log(`${game.title} - OK`)
        } catch (error) {
            console.log(`${game.title} - ERRO`)
        }
    }
        
}

main()
.then(async () => {
    await database.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await database.$disconnect()
})