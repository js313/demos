import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class Protect {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const authHeaders = ctx.request.headers().authorization
    if (!authHeaders) return ctx.response.json({ error: 'Must be logged in' })
    const token: string = authHeaders.split('Bearer ')[1]
    const data: jwt.JwtPayload = <jwt.JwtPayload>await jwt.verify(token, <string>Env.get('JWT_PRIVATE_KEY'))
    if (data) {
      ctx.user = { id: data.id, name: data.name, email: data.email }
      return await next()
    }
    ctx.response.status(401)
    return ctx.response.unauthorized({ error: 'Must be logged in' })  //return does not work in middlewares.
  }
}
