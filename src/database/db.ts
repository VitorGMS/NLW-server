import { PrismaClient } from "@prisma/client";

const database = new PrismaClient({
    log: ['error', 'info']
})

export default database