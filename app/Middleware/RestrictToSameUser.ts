import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task';

export default class RestrictToSameUser {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let { id } = ctx.params
    const task = await Task.find(id)
    if (task?.user_id === ctx.user?.id)
      return await next()

    return ctx.response.unauthorized({ "error": "Not authorized!" })
  }
}
