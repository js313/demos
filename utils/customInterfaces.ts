import Sequelize from 'sequelize'

export interface IStudent extends Sequelize.Model {
    id: number,
    email: string,
    name: string,
    age: number
}

export interface IClass extends Sequelize.Model {
    id: number,
    standard: number,
    division: string
}