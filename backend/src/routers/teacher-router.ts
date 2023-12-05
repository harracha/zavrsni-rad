import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Prisma } from '.prisma/client';
import { create, deleteTeacher, list, update } from '../controllers/teacher-controller';
import { userHasRole } from '../lib/middleware/user-role-middleware';
import { sessionUserExists } from '../lib/middleware/session-middleware';


const teacherRouter = Router();

teacherRouter.post('/login', async (req: Request, res:Response, next:Function) => {
    const loginEmail: string =  req.body.email;
    const loginPassword: string =  req.body.password;

    if (!loginEmail || !loginPassword) {
        return res.status(400).send('User data not defined correctly')
    }

    await prisma.teacher.findUnique({
        where: {
            email: loginEmail
        }, 
        select: {
            email: true, 
            password: true, 
            Role: true
        }
    }).then((response) => {
        if(!response) {
            return res.status(401).send('Incorrect email or password')
        }
        else {
            if(response.password !== loginPassword) {
                return res.status(401).send('Incorrect email or password')
            }
            req.session.user = {email: response.email, role: response.Role}
        }
        res.status(200).send(req.session.user)
    }).catch((error) => {
        res.status(500).send({error: error, message: 'Failed connecting to database'})
    });
})

// ADMIN FUNCTION -> list all teachers in the database 
teacherRouter.get('/list', sessionUserExists, userHasRole(['ADMIN']), async (req: Request, res: Response, next: Function) => {
    try{
        const teachers = await list();
        res.status(200).send(teachers)
    } catch(error) {
        res.status(500).send(error)
    }
});

// ADMIN FUNCTION -> list teachers by class group, MIGHT NEED TO BE CLASS GROUP NAME 
teacherRouter.get('/list/:classGroupId', sessionUserExists, userHasRole(['ADMIN']), async (req: Request, res: Response, next: Function) => {
    try{
        const teachers = await list();
        res.status(200).send(teachers)
    } catch(error) {
        res.status(500).send(error)
    }
});


teacherRouter.post('/create', sessionUserExists, userHasRole(['ADMIN']), async (req: Request, res:Response, next: Function) => {
    const inputData: Prisma.TeacherCreateInput = req.body;

    try {
        const newTeacher = await create(inputData)
        res.status(200).send(newTeacher)
    } catch (error){
        throw new Error(error as string)
    }

})

teacherRouter.put('/update/:teacherId', sessionUserExists, userHasRole(['ADMIN']), async (req:Request, res: Response, next:Function) => {
    const teacherId = req.params.teacherId;
    const updateData = req.body

    try {
        const updatedTeacher = await update(teacherId, updateData)
        res.status(200).send(updatedTeacher)
    } catch (error) {
        throw new Error(error as string)
    }
})

teacherRouter.delete('/delete/:teacherId', sessionUserExists, userHasRole(['ADMIN']),  async (req:Request, res: Response, next:Function) => {
    const teacherId = req.params.teacherId;
    try {
        const deletedTeacher = await deleteTeacher(teacherId);
        res.status(200).send(deletedTeacher)
    } catch(error) {
        throw new Error(error as string)
    }
})




export default teacherRouter;