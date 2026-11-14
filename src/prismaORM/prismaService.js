import { PrismaClient } from "../prismaORM/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

export class PrismaService extends PrismaClient{

    constructor() {
        const databaseUrl = process.env.DATABASE_URL; 

        super({
            // log: ["query"],
            adapter: new PrismaPg({ connectionString: databaseUrl })
        });

    }

}