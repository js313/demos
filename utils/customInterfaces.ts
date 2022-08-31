import Sequelize from 'sequelize'

export interface IAddStudent extends Sequelize.Model {
    id: number,
    email: string,
    name: string,
    age: number
}