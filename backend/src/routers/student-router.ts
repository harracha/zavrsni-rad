import { Router, Request, Response } from 'express';
import { userHasRole } from '../lib/middleware/user-role-middleware';
import { createStudent, deleteStudent, getStudent, list, listStudentsByClassGroup, listStudentsByLabGroup, updateStudent } from '../controllers/student-controller';
import { sessionUserExists } from '../lib/middleware/session-middleware';
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';

const studentRouter = Router();

// ADMIN / TEACHER / ASSISTANT FUNCTION -> list students (list by class groupId optional)
studentRouter.get('/list/:classGroupId', sessionUserExists,userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT']), async (req: Request, res: Response, next: Function) => {
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
studentRouter.get('/list/:labGroupId',sessionUserExists,userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT']),  async (req: Request, res: Response, next: Function) => {
    const groupId = req.params.labGroupId;

    if (!groupId) {
        res.status(400).send('Class group id not defined properly')
    }

    try {
        const students = await listStudentsByLabGroup(groupId)
        res.status(200).send(students)
    } catch (error){
        res.status(500).send({message: 'Failed connecting to database', error: error})

    }
    res.send('Hello teacher')
})

studentRouter.get('/list', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT']), async (req: Request, res: Response, next: Function) => {

    try{
        const students = await list();
        res.status(200).send(students)
    } catch(error){
        res.status(500).send({message: 'Failed connecting to database', error: error})
    }
    
})

studentRouter.get('/:studentId', sessionUserExists, userHasRole(['ADMIN', 'ASSISTANT', 'PROFESSOR', 'STUDENT']), async (req:Request, res: Response, next: Function) => {
    const studentId = req.params.studentId;

    if (req.session.user?.role === 'STUDENT'){
        const student = await prisma.student.findUnique({
            where:{
                email: req.session.user.email
            },
            select: {
                studentId: true
            }
        })
        if (student?.studentId !== studentId){
            res.status(403).send({message: 'Ne možete pristupiti podatcima drugih studenata.'})
        }
    }
    try{
        const student = await getStudent(studentId);
        res.status(200).send(student);
    }catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

studentRouter.post('/create', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT']), async (req: Request, res: Response, next: Function) => {
    const studentInfo: Prisma.StudentCreateInput = req.body;

    try{
        const newStudent = await createStudent(studentInfo);
        res.status(200).send(newStudent);
    } catch(error) {
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

studentRouter.put('/update/:studentId', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR', 'STUDENT']), async(req:Request, res: Response, next: Function) => {
    const studentId = req.params.studentId;
    const updateData: Prisma.StudentUpdateInput = req.body
    if (req.session.user?.role == 'STUDENT'){
        const student = await prisma.student.findUnique({
            where:{
                email: req.session.user.email
            },
            select: {
                studentId: true
            }
        })
        if (student?.studentId !== studentId){
            res.status(403).send({message: 'Ne možete mijenjati podatke drugih studenata.'})
        }
    }

    try {
        const updatedStudent = await updateStudent(studentId, updateData)
        res.status(200).send(updatedStudent)
    }catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

studentRouter.delete('/delete/:studentId', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req:Request, res:Response, next: Function) => {
    const studentId = req.params.studentId;

    try {
        const deletedStudent = await deleteStudent(studentId);
        res.status(200).send(deletedStudent)
    }catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

export default studentRouter;