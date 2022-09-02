import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
    public async index(ctx: HttpContextContract) {
        const tasks = await Task.all()
        ctx.response.status(200)
        return { tasks }
    }

    public async store(ctx: HttpContextContract) {
        const validationSchema = schema.create({
            title: schema.string({ trim: true }, [rules.maxLength(255)])
        })
        const validatedTask = await ctx.request.validate({
            schema: validationSchema,
            messages: {
                'title.required': 'Enter task title!',
                'title.maxLength': 'Task title cannot exceed 255 characters!'
            }
        })
        const newTask = await Task.create(validatedTask)
        ctx.response.status(201)
        return newTask
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

        response.status(200)
        task.is_completed = validatedTask.is_completed
        task.title = validatedTask.title
        task.save()
        return task
    }

    public async show({ response, params }: HttpContextContract) {
        const task = await Task.findOrFail(params.id)
        response.status(200)
        return task
    }

    public async destroy({ response, params }: HttpContextContract) {
        const task = await Task.findOrFail(params.id)

        response.status(204)
        task.delete()
        return
    }
}
