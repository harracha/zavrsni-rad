import { Router, Request, Response } from 'express';
import { sessionUserExists } from '../lib/middleware/session-middleware';
import { createlabGroup, deletelabGroup, getlabGroup, list, updatelabGroup } from '../controllers/labGroup-controller';
import { userHasRole } from '../lib/middleware/user-role-middleware';
import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

const labGroupRouter = Router();

labGroupRouter.get('/list', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req: Request,res: Response,next: Function) => {
    try {
        const labGroups = await list();
        res.status(200).send(labGroups)
    } catch(error) {
        console.log(error);
        res.status(500).send({message: 'Failed connecting to database', error: error})
    }
})

labGroupRouter.get('/:labGroupId', sessionUserExists, userHasRole(['ADMIN','ASSISTANT', 'PROFESSOR']), async (req: Request,res: Response,next: Function) => {
    const id = req.params.labGroupId;
    if (req.session.user?.role === 'ASSISTANT'){
        const assistant = await prisma.teacher.findUnique({
            where: {
                email: req.session.user.email
            },
            select: {
                labGroup: true
            }
        })

        if(assistant?.labGroup?.groupId !== id) {
            res.status(403).send({message: `Nemate pristup detaljima grupe predavanja koja Vam nije dodijeljena.`})
        }
    }
    try {
        const labGroup = await getlabGroup(id);
        res.status(200).send(labGroup)
    } catch(error) {
        res.send(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

labGroupRouter.post('/create', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req: Request, res:Response, next: Function) => {
    const labGroupInfo: Prisma.LabGroupCreateInput = req.body;
    try {
        const newlabGroup = await createlabGroup(labGroupInfo)
        res.status(200).send(newlabGroup);
    } catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

labGroupRouter.put('/update/:labGroupId', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req:Request, res:Response, next:Function) => {
    const id = req.params.labGroupId;
    const updateInfo: Prisma.LabGroupUpdateInput = req.body;

    try {
        const updatedGroup = await updatelabGroup(id, updateInfo);
        res.status(200).send(updatedGroup);
    } catch(error) {
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

labGroupRouter.delete('/delete/:labGroupId', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req:Request, res:Response, next:Function) => {
    const id = req.params.labGroupId;
    try{
        const deletedGroup = await deletelabGroup(id);
        res.send(200).send(deletedGroup)
    }catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})


export default labGroupRouter;