import { Router, Request, Response, query } from 'express'
import { sessionUserExists } from '../lib/middleware/session-middleware'
import { userHasRole } from '../lib/middleware/user-role-middleware'
import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { createLabExercises } from '../controllers/labExercise-controller'

const labExerciseRouter = Router()

labExerciseRouter.post(
  '/create',
  sessionUserExists,
  userHasRole(['ADMIN', 'PROFESSOR', 'ASSISTANT']),
  async (req: Request, res: Response, next: Function) => {
    const exerciseData: Prisma.LabExerciseCreateManyInput = req.body

    try {
      const labs = await createLabExercises(exerciseData)
      res.status(200).send(labs)
    } catch (error) {
      res
        .status(500)
        .send({
          message:
            'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.',
          error: error,
        })
    }
  },
)

export default labExerciseRouter
