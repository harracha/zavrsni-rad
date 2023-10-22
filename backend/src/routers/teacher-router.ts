import { Router, Request, Response } from 'express';

const teacherRouter = Router();

teacherRouter.get('/', (req: Request, res: Response, next: Function) => {
    res.send('just checking')
})



export default teacherRouter;