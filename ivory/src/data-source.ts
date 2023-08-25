import "reflect-metadata"
import { DataSource } from "typeorm"
import { User, Wallet } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "p@55w0rd",
    database: "hassan",
    synchronize: true,
    logging: false,
    entities: [User, Wallet],
    migrations: [],
    subscribers: [],
})
