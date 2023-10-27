import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Prisma } from '.prisma/client';


const teacherRouter = Router();

teacherRouter.get('/', (req: Request, res: Response, next: Function) => {

    //const teacherType: Prisma.TeacherUncheckedCreateInput = {}
    res.send('Hello teacher')
});

teacherRouter.post('/create', async (req: Request, res:Response, next: Function) => {
    const inputData: Prisma.TeacherCreateInput = req.body;

    const newTeacher = await prisma.teacher.create({
        data: {
            email: inputData.email, 
            firstName: inputData.firstName, 
            lastName: inputData.lastName, 
            password: inputData.password,
            classGroup: inputData.classGroup,
            labGroup: inputData.labGroup,
            profilePicture: inputData.profilePicture,
            Role: inputData.Role
        }
    })

    res.send(newTeacher)

})



export default teacherRouter;