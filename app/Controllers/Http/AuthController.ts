import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import argon2 from 'phc-argon2'

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        const user = await User.create(request.body())  //validate
        const token = await jwt.sign({ id: user.id }, Env.get('JWT_PRIVATE_KEY'))
        response.status(201)
        return { token }
    }

    public async login({ request, response }: HttpContextContract) {
        const user = await User.findByOrFail('email', request.body().email)

        if (await argon2.verify(user.password, request.body().password)) {
            const token = await jwt.sign({ id: user.id }, Env.get('JWT_PRIVATE_KEY'))
            response.status(200)
            return { token }
        }
        else {
            response.status(401)
            return { message: "Invalid Credentials!" }
        }
    }
}
