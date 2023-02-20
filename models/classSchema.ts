import { sequelize } from '../utils/sequelizeConnection'
import Sequelize from "sequelize";
import { IClass } from '../utils/customInterfaces';
// import Student from './studentSchema';   //circular dependency

const Class = sequelize.define<IClass>("classes", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    standard: Sequelize.INTEGER,
    division: Sequelize.CHAR
}, { timestamps: false })

// Student.belongsTo(Class, {   //have to do this in student schema as importing 'Student' here and 'Class' in studentSchema creates circular dependency.
//     foreignKey: 'classId'
// })

export default Class