import { Router, Request, Response, query } from 'express'
import { sessionUserExists } from '../lib/middleware/session-middleware'
import { userHasRole } from '../lib/middleware/user-role-middleware'
import { Prisma, Student } from '@prisma/client'
import {
  createLabExercises,
  deleteLabExercises,
  getLabExercises,
  updateLabExercises,
} from '../controllers/labExercise-controller'
import { labExerciseFilterParams } from '../types/labExercise-filter'
import { parseLabExerciseFilterParams } from '../utils/url-parser/labExercise-query-parser'
import { getStudent } from '../controllers/student-controller'

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

labExerciseRouter.get(
  '/list',
  sessionUserExists,
  async (req: Request, res: Response, next: Function) => {
    const params: labExerciseFilterParams = parseLabExerciseFilterParams(
      req.url,
    )

    if (req.session.user?.role === 'STUDENT') {
      const student = (await getStudent(req.session.user?.email)) as Student
      params.studentId = [student.studentId]
    }

    try {
      const labs = await getLabExercises(params)
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

labExerciseRouter.put(
  '/update',
  sessionUserExists,
  userHasRole(['ADMIN', 'ASSISTANT', 'PROFESSOR']),
  async (
    req: Request<any, any, Prisma.LabExerciseUncheckedUpdateManyInput>,
    res: Response,
    next: Function
  ) => {
    const updateData = req.body

    try {
      const updatedLabs = await updateLabExercises(updateData)
      res.status(200).send(updatedLabs)
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

labExerciseRouter.delete(
  '/delete',
  sessionUserExists,
  userHasRole(['ADMIN', 'ASSISTANT', 'PROFESSOR']),
  async (req: Request, res: Response, next: Function) => {
    const params: labExerciseFilterParams = parseLabExerciseFilterParams(
      req.url,
    )

    try {
      const deletedLabs = await deleteLabExercises(params)
      return deletedLabs
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
