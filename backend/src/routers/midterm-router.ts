import { Router, Request, Response } from 'express';
import { sessionUserExists } from '../lib/middleware/session-middleware';
import { userHasRole } from '../lib/middleware/user-role-middleware';
import { Prisma } from '@prisma/client';
import { create, createMany, deleteMidterm, updateMidterm } from '../controllers/midterm-controller';

const midtermRouter = Router();

midtermRouter.post('/createMany', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req: Request, res: Response, next: Function) => {
    const midtermData: Prisma.MidtermCreateManyInput = req.body;
    try {
        const midterms = await createMany(midtermData);
        res.status(200).send(midterms);
    } catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

midtermRouter.post('/create', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async(req:Request, res:Response, next:Function) => {
    const midtermData: Prisma.MidtermCreateInput = req.body
    try{
        const midterm = await create(midtermData)
        res.status(200).send(midterm)
    } catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

midtermRouter.put('/update/:midtermId', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async(req: Request, res) => {
    const midtermId = req.params.midtermId
    const updateData: Prisma.MidtermUpdateInput = req.body;

    try{
        const updatedMidterm = await updateMidterm(midtermId, updateData);
        res.status(200).send(updatedMidterm)
    } catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

midtermRouter.delete('/delete/:midtermId', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async(req:Request, res:Response, next:Function) => {
    const midtermId = req.params.midtermId;

    try{
        const deletedMidterm = await deleteMidterm(midtermId);
        res.status(200).send(deletedMidterm)        
    } catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }

})

midtermRouter.get('/list/:acYear', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']))

export default midtermRouter;