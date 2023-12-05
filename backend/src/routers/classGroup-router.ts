import { Router, Request, Response } from 'express';
import { sessionUserExists } from '../lib/middleware/session-middleware';
import { userHasRole } from '../lib/middleware/user-role-middleware';
import prisma from '../lib/prisma';
import { createClassGroup, deleteClassGroup, getClassGroup, list, updateClassGroup } from '../controllers/classGroup-controller';
import { Prisma } from '@prisma/client';

const classGroupRouter = Router();

// lsit all class groups

classGroupRouter.get('/list', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req: Request,res: Response,next: Function) => {
    try {
        const classGroups = await list();
        res.status(200).send(classGroups)
    } catch(error) {
        console.log(error);
        res.status(500).send({message: 'Failed connecting to database', error: error})
    }
})

classGroupRouter.get('/:classgroupId', sessionUserExists, userHasRole(['ADMIN','ASSISTANT', 'PROFESSOR']), async (req: Request,res: Response,next: Function) => {
    const id = req.params.classGroupId;
    if (req.session.user?.role === 'ASSISTANT'){
        const assistant = await prisma.teacher.findUnique({
            where: {
                email: req.session.user.email
            },
            select: {
                classGroup: true
            }
        })

        if(assistant?.classGroup?.groupId !== id) {
            res.status(403).send({message: `Nemate pristup detaljima grupe predavanja koja Vam nije dodijeljena.`})
        }
    }
    try {
        const classGroup = await getClassGroup(id);
        res.status(200).send(classGroup)
    } catch(error) {
        res.send(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

classGroupRouter.post('/create', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req: Request, res:Response, next: Function) => {
    const classGroupInfo: Prisma.ClassGroupCreateInput = req.body;
    try {
        const newClassGroup = await createClassGroup(classGroupInfo)
        res.status(200).send(newClassGroup);
    } catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

classGroupRouter.put('/update/:classGroupId', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req:Request, res:Response, next:Function) => {
    const id = req.params.classGroupId;
    const updateInfo: Prisma.ClassGroupUpdateInput = req.body;

    try {
        const updatedGroup = await updateClassGroup(id, updateInfo);
        res.status(200).send(updatedGroup);
    } catch(error) {
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

classGroupRouter.delete('/delete/:classGroupId', sessionUserExists, userHasRole(['ADMIN', 'PROFESSOR']), async (req:Request, res:Response, next:Function) => {
    const id = req.params.classGroupId;
    try{
        const deletedGroup = await deleteClassGroup(id);
        res.send(200).send(deletedGroup)
    }catch(error){
        res.status(500).send({message: 'Greška pri spajanju na bazu podataka.', error: error})
    }
})

export default classGroupRouter;