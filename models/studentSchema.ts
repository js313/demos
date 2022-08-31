import { DataTypes } from 'sequelize'
import { IAddStudent } from '../utils/customInterfaces'
import { sequelize } from '../utils/sequelizeConnection'
import Sequelize from 'sequelize'

export const Student = sequelize.define<IAddStudent>("students", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.TINYINT,
        validate: {
            min: 0,
            max: 200
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
})

export default Student