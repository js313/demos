import { Dialect, Sequelize } from "sequelize";

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver
})

export const dbConnection = () => {
    try {
        return sequelize.authenticate().then(data => {
            console.log('Connection has been established successfully.');
            return data
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
