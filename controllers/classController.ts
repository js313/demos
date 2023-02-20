import { NextFunction, Request, Response } from "express";
import Class from "../models/classSchema";
import Student from "../models/studentSchema";
import { IClass } from "../utils/customInterfaces";
import StatusCode from "../utils/statusCode";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    const classes = await Class.findAll({
        include: [{     //populates Student
            model: Student
        }]
    })
    res.status(StatusCode.SuccessOK).json({ classes })
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    const { classId }: { classId?: string } = req.params
    const studentClass: IClass | null = await Class.findByPk(classId, {
        include: [{
            model: Student
        }]
    })
    res.status(StatusCode.SuccessOK).json({ studentClass })
}

export async function newClass(req: Request, res: Response, next: NextFunction) {
    const { standard, division }: { standard?: number, division?: string } = req.body
    const newClass: IClass = await Class.create({ standard, division })
    res.status(StatusCode.SuccessCreated).json({ newClass })
}

export async function updateClass(req: Request, res: Response, next: NextFunction) {
    const { standard, division }: { standard?: number, division?: string } = req.body
    const { classId }: { classId?: string } = req.params
    const newClass: number[] = await Class.update({ standard, division }, {
        where: {
            id: classId
        }
    })
    res.status(StatusCode.SuccessCreated).json({ newClass })
}

export async function deleteClass(req: Request, res: Response, next: NextFunction) {
    const { classId }: { classId?: string } = req.params
    const success: number = await Class.destroy({
        where: {
            id: classId
        }
    })
    res.status(StatusCode.SuccessCreated).json({ success })
}