import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
    public async index(ctx: HttpContextContract) {
        const userId = ctx.user?.id || 0
        const tasks = await Task.query().where('user_id', userId)
        return ctx.response.ok(tasks)
    }

    public async store(ctx: HttpContextContract) {
        const validationSchema = schema.create({
            title: schema.string({ trim: true }, [rules.maxLength(255)]),
        })
        const validatedTask = await ctx.request.validate({
            schema: validationSchema,
            messages: {
                'title.required': 'Enter task title!',
                'title.maxLength': 'Task title cannot exceed 255 characters!'
            }
        })
        if (!ctx.user || !ctx.user.id) return
        const newTask = await Task.create({ ...validatedTask, user_id: ctx.user.id })
        return ctx.response.created(newTask)
    }

    public async update({ request, response, params }: HttpContextContract) {
        const validationSchema = schema.create({
            title: schema.string({ trim: true }, [rules.maxLength(255)]),
            is_completed: schema.boolean()
        })
        const validatedTask = await request.validate({
            schema: validationSchema,
            messages: {
                'title.required': 'Enter task title!',
                'title.maxLength': 'Task title cannot exceed 255 characters!'
            }
        })
        const task = await Task.findOrFail(params.id)

        task.is_completed = validatedTask.is_completed
        task.title = validatedTask.title
        task.save()
        return response.ok(task)
    }

    public async show({ response, params }: HttpContextContract) {  //preload to populate
        const task = await Task.query().where('tasks.id', params.id).preload('user')
        return response.ok(task)
    }

    public async destroy({ response, params }: HttpContextContract) {
        const task = await Task.findOrFail(params.id)

        response.noContent()
        task.delete()
        return
    }
}
