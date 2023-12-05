import { Request, Response } from "express";

export const sessionUserExists = async (req: Request, res: Response, next: Function) => {
    if(!req.session.user){
        res.status(401).send('User not logged in')
    }
    else {
        next()
    }
}