import { sequelize } from "../utils/sequelizeConnection"

const syncDB = async () => { await sequelize.sync({ alter: true }).catch((err) => { console.log(err) }) }

export default syncDB