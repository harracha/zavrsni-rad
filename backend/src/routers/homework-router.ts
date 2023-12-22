import { Router, Request, Response, query } from 'express';
import { sessionUserExists } from '../lib/middleware/session-middleware';
import { userHasRole } from '../lib/middleware/user-role-middleware';
import { Prisma, Student } from '@prisma/client';
import {  createHomework, deleteHomework, filterExistingHomeworks, listHomeworks, listStudentHomeworks, updateHomework } from '../controllers/homework-controller';
import { homeworkPointsValidation } from '../lib/middleware/data-validation/homework';
import prisma from '../lib/prisma';
import { homeworkFilterParams } from '../types/homeworkFilter';
import { parseHomeworkFilterParams } from '../utils/url-parser/homework-query-parser';

const homeworkRouter = Router();


homeworkRouter.post('/create', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT']), homeworkPointsValidation, async (req:Request, res:Response, next: Function) => {
    const homeworkData: Prisma.HomeworkUncheckedCreateInput[] =  req.body;
    try{
        const homework = await filterExistingHomeworks(homeworkData);
        res.status(200).send(homework)
    } catch(error) {
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.', error:error})
    }
})


homeworkRouter.get('/get', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT', 'STUDENT']), async(req:Request<any, any, any, homeworkFilterParams>, res:Response, next:Function) => {

    const queryParams = parseHomeworkFilterParams(req.url);
    console.log(queryParams)

    if(req.session.user?.role === 'STUDENT'){
        // staviti njegov ID u query paramse
    }

    try{
        const homework = await listHomeworks(queryParams)
        res.status(200).send(homework)
    }catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.', error:error})
    }

})

homeworkRouter.put('/update', sessionUserExists, userHasRole(['ADMIN', 'ASSISTANT', 'PROFESSOR']),homeworkPointsValidation, async (req:Request<any, any, Prisma.HomeworkUncheckedUpdateManyInput, any >, res:Response, next:Function) => {
    const updateData = req.body;

    try {
        const updatedHomeworks = await updateHomework(updateData)
        res.status(200).send(updatedHomeworks);
    } catch (error) {
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.', error:error})
    }
})


homeworkRouter.delete('/delete', sessionUserExists, userHasRole(['ADMIN', 'ASSISTANT', 'PROFESSOR']), async (req: Request<any, any, homeworkFilterParams, any>, res: Response, next: Function) => {
    const deleteData = req.body;

    try {
        const deletedHomeworks = await deleteHomework(deleteData);
        res.status(200).send(deletedHomeworks)
    } catch (error) {
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka, molimo pokušajte kasnije.', error:error})
    }
})
export default homeworkRouter;