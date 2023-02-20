import { IStudent } from '../utils/customInterfaces'
import { sequelize } from '../utils/sequelizeConnection'
import Sequelize from 'sequelize'
import Class from './classSchema'

const Student = sequelize.define<IStudent>("students", {
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
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, { timestamps: false })

Class.hasMany(Student, {
    onDelete: 'cascade'
})

Student.belongsTo(Class, {
    foreignKey: 'classId'
})

export default Student