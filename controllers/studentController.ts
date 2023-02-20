import { NextFunction, Request, Response } from "express";
import Class from "../models/classSchema";
import Student from "../models/studentSchema";
import { IStudent } from "../utils/customInterfaces";
import StatusCode from "../utils/statusCode";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    const students = await Student.findAll({
        include: {
            model: Class
        }
    })
    res.status(StatusCode.SuccessOK).json({ students })
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    const { studentId }: { studentId?: string } = req.params
    const student: IStudent | null = await Student.findByPk(studentId)
    res.status(StatusCode.SuccessOK).json({ student })
}

export async function newStudent(req: Request, res: Response, next: NextFunction) {
    const { name, age, email, classId }: { name?: string, age?: number, email?: string, classId?: number } = req.body
    const newStudent: IStudent = await Student.create({ name, age, email, classId })
    res.status(StatusCode.SuccessCreated).json({ newStudent })
}

export async function updateStudent(req: Request, res: Response, next: NextFunction) {
    const { name, age, email, classId }: { name?: string, age?: number, email?: string, classId?: number } = req.body
    const { studentId }: { studentId?: string } = req.params
    const newStudent: number[] = await Student.update({ name, email, age, classId }, {
        where: {
            id: studentId
        }
    })
    res.status(StatusCode.SuccessCreated).json({ newStudent })
}

export async function deleteStudent(req: Request, res: Response, next: NextFunction) {
    const { studentId }: { studentId?: string } = req.params
    const newStudent: number[] = await Student.update({ deleted: true }, {
        where: {
            id: studentId
        }
    })
    res.status(StatusCode.SuccessCreated).json({ newStudent })
}