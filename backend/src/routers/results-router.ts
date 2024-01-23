import { Router,Request, Response } from "express";
import { getClassGroupsPoints } from "../controllers/results-controller";


const resultsRouter = Router();

resultsRouter.get('/classGroupData/:acYear', async(req: Request, res:Response, next:Function) => {
    const acYear = req.params.acYear;
    try {
         const points = await getClassGroupsPoints(acYear)
         res.status(200).send(points)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default resultsRouter;