import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import argon2 from 'phc-argon2'

export default class AuthController {
    public async register(ctx: HttpContextContract) {
        const user = await User.create(ctx.request.body())  //validate
        const token = await jwt.sign({ id: user.id }, Env.get('JWT_PRIVATE_KEY'))
        ctx.response.status(201)
        return { token }
    }

    public async login(ctx: HttpContextContract) {
        const user = await User.findByOrFail('email', ctx.request.body().email)

        if (await argon2.verify(user.password, ctx.request.body().password)) {
            const token = await jwt.sign({ id: user.id }, Env.get('JWT_PRIVATE_KEY'))
            ctx.user = user
            ctx.response.status(200)
            return { token }
        }
        else {
            ctx.response.status(401)
            return { message: "Invalid Credentials!" }
        }
    }
}
