import express, { Express, NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import studentRouter from './routes/studentRoutes'
import classRouter from './routes/classRoutes'
// import authRouter from './routes/authRoutes'
// import verifyRouter from './routes/verifyRoutes'
import { dbConnection, sequelize } from './utils/sequelizeConnection'
import Student from './models/studentSchema'
import Class from './models/classSchema'
import syncDB from './middlewares/sequelizeSync'
// import handleError from './middlewares/handleError'
// import rateLimiter from './middlewares/rateLimiter'
// import { CustomError } from './utils/customError'
// import messages from './utils/messages'
const app: Express = express()

// app.use(rateLimiter)
dbConnection()
syncDB()
app.use(express.json())

app.use('/class', classRouter)
app.use('/student', studentRouter)
// app.use('/blog', blogRouter)
// app.use('/verify', verifyRouter)

// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     next(new CustomError([messages.pageNotFound], 404))
// })

// app.use(handleError)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await sequelize.sync()
        const newStudent = await Student.create({ name: "test", email: "test2@test.com", age: 3 })
        res.status(200).json({ newStudent })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

app.listen(3000, () => {
    console.log("Server started at port 3000");
})