import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const authRouter = Router();

/* 
authRouter.post('/login', (req: Request, res:Response, next:Function) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (!email || !password) {
        throw new Error('Required user data not defined')
    }
    
    const user = await prisma.
}) */
export default authRouter;