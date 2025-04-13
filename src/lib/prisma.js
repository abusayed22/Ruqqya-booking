import { PrismaClient } from "@prisma/client";

if (process.env.NODE_ENV === "production") {
    global.PrismaClient = global.PrismaClient || new PrismaClient();
    var prisma = global.PrismaClient;
} else {
    var prisma = new PrismaClient();
}


export default prisma;