import { Router, Request, Response, query } from 'express';
import { sessionUserExists } from '../lib/middleware/session-middleware';
import { userHasRole } from '../lib/middleware/user-role-middleware';
import { Prisma, Student } from '@prisma/client';
import prisma from '../lib/prisma';
import { createLabExercises, getLabExercises } from '../controllers/labExercise-controller';
import {  labExerciseFilterParams } from '../types/labExercise-filter';
import { parseLabExerciseFilterParams } from '../utils/url-parser/labExercise-query-parser';
import { getStudent } from '../controllers/student-controller';


const labExerciseRouter = Router();

labExerciseRouter.post('/create', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT']), async(req:Request, res:Response, next:Function) => {
    
    const exerciseData: Prisma.LabExerciseCreateManyInput = req.body;
    
    try{
        const labs = await createLabExercises(exerciseData);
        res.status(200).send(labs);
    } catch(error) {
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.', error: error})
    }
})

labExerciseRouter.get('/get', sessionUserExists, async (req:Request, res: Response, next: Function) => {

    const params: labExerciseFilterParams = parseLabExerciseFilterParams(req.url);

    if(req.session.user?.role === 'STUDENT') {
        const student = await getStudent(req.session.user?.email) as Student;
        params.studentId = [student.studentId]
    }

    try {
        const labs = await getLabExercises(params);
        res.status(200).send(labs);
    } catch(error) {
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.', error: error})
    }

})

// labExerciseRouter.put()

export default labExerciseRouter
