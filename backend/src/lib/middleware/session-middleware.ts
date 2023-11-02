import { Request, Response } from "express";

// potencijalno ne treba 
export const sessionUserExists = async (req: Request, res: Response, next: Function) => {
    if(!req.session.user){
        res.status(401).send('User not logged in')
    }
    else {
        next()
    }
}