// TODO -> setup ADMIN / PROFESSOR / ASSISTANT authentication middleware

import { SystemRole } from "@prisma/client"
import { Request, Response } from "express"
export const userHasRole = (role: SystemRole[]) => {
    return ( req: Request, res: Response, next:Function) =>{ 
    if (!req.session.user) {
        return res.status(401).send('User not logged in')
    }
    else if(!role.includes(req.session.user.role)) {
        return res.status(401).send('User not authorized to access content')
    }
    else {
        next()
    }}
}