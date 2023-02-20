import express, { NextFunction, Request, Response, Router } from "express";
import { deleteClass, getAll, getOne, newClass, updateClass } from "../controllers/classController";
import { validationError } from "../utils/errorHandler";
// import { newBlogCheck, updateBlogCheck } from "../validation/blogValidation";
const router: Router = express.Router()

router.get('/', getAll)

router.post('/', validationError, newClass)

router.get('/:classId', getOne)

router.patch('/:classId', validationError, updateClass)

router.delete('/:classId', deleteClass)


export default router