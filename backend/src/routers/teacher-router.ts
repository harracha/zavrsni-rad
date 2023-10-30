import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Prisma } from '.prisma/client';
import { create, deleteTeacher, update } from '../controllers/teacher-controller';


const teacherRouter = Router();

// ADMIN FUNCTION -> list all teachers in the database 
teacherRouter.get('/list/teachers', (req: Request, res: Response, next: Function) => {

    res.send('Hello teacher')
});

// ADMIN / TEACHER / ASSISTANT FUNCTION -> list students
teacherRouter.get('/list/students/:classGroupId',  (req: Request, res: Response, next: Function) => {
    const groupId = req.params.classGroupId;

    if(groupId) {
        // if groupId is defined, list all students belonging to the group
    } else {
        // list all students
    }

    res.send('Hello teacher')
})

// ADMIN / TEACHER FUNCTION -> list students for certain lab group
teacherRouter.get('/list/students/:labGroupId',  (req: Request, res: Response, next: Function) => {
    const groupId = req.params.labGroupId;


    res.send('Hello teacher')
})


teacherRouter.post('/create', async (req: Request, res:Response, next: Function) => {
    const inputData: Prisma.TeacherCreateInput = req.body;

    try {
        const newTeacher = await create(inputData)
        res.send(newTeacher)
    } catch (error){
        throw new Error(error as string)
    }

})

teacherRouter.put('/update/:teacherId', async (req:Request, res: Response, next:Function) => {
    const teacherId = req.params.teacherId;
    const updateData = req.body

    try {
        const updatedTeacher = await update(teacherId, updateData)
        res.send(updatedTeacher)
    } catch (error) {
        throw new Error(error as string)
    }
})

teacherRouter.delete('/delete/:teacherId',  async (req:Request, res: Response, next:Function) => {
    const teacherId = req.params.teacherId;
    try {
        const deletedTeacher = await deleteTeacher(teacherId);
        res.send(deletedTeacher)
    } catch(error) {
        throw new Error(error as string)
    }
})




export default teacherRouter;