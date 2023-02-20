import express, { Request, Response, NextFunction } from "express";
import { deleteStudent, getAll, getOne, newStudent, updateStudent } from "../controllers/studentController";
// import verifyToken from "../middlewares/verifyToken";
import { validationError } from "../utils/errorHandler";
// import { deleteUserCheck, newUserCheck, updateUserCheck } from "../validation/userValidation";
const router = express.Router()

router.get('/', getAll)
router.post('/', validationError, newStudent)

router.get('/:studentId', getOne)
router.patch('/:studentId', validationError, updateStudent)
router.delete('/:studentId', validationError, deleteStudent)

export default router