import { Router, Request, Response } from 'express';
import { userHasRole } from '../lib/middleware/user-role-middleware';
import { listStudentsByClassGroup } from '../controllers/student-controller';

const studentRouter = Router();

// ADMIN / TEACHER / ASSISTANT FUNCTION -> list students (list by class groupId optional)
studentRouter.get('/list/:classGroupId', userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT']), async (req: Request, res: Response, next: Function) => {
    const groupId = req.params.classGroupId;

    if(groupId) {
        const students = await listStudentsByClassGroup(groupId).catch((error) => {
            res.status(500).send({message: 'Failed connecting to database', error: error})
        })
        res.status(200).send(students)
    } else {
        res.status(400).send('Class group id not defined properly')
    }

})

// ADMIN / TEACHER FUNCTION -> list students for certain lab group
studentRouter.get('/list/:labGroupId',  (req: Request, res: Response, next: Function) => {
    const groupId = req.params.labGroupId;


    res.send('Hello teacher')
})

export default studentRouter;