import { Router, Request, Response } from 'express'
import { sessionUserExists } from '../lib/middleware/session-middleware'
import { userHasRole } from '../lib/middleware/user-role-middleware'
import {
  create,
  getAcYears,
  getDropdownData,
} from '../controllers/enrollment-controller'
import { Prisma } from '@prisma/client'

const enrollmentRouter = Router()

enrollmentRouter.get(
  '/getDropdownContent/:acYear',
  async (req: Request, res: Response, next: Function) => {
    const acYear = req.params.acYear.replace('-', '/')
    try {
      const data = await getDropdownData(acYear)
      res.status(200).send(data)
    } catch (error) {
      res
        .status(500)
        .send({
          message:
            'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.',
        })
    }
  },
)

enrollmentRouter.get(
  '/getAcYears',
  async (req: Request, res: Response, next: Function) => {
    try {
      const years = await getAcYears()
      res.status(200).send(years)
    } catch (error) {
      res
        .status(500)
        .send({
          message:
            'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.',
        })
    }
  },
)

enrollmentRouter.post(
  '/create',
  async (req: Request, res: Response, next: Function) => {
    const data = req.body as Prisma.EnrollmentUncheckedCreateInput
    try {
      const enrollment = await create(data)
      res.status(200).send(enrollment)
    } catch (error) {
      res
        .status(500)
        .send({
          message:
            'Greška pri spajanju na bazu podataka. Molimo pokušajte kasnije.',
        })
    }
  },
)

export default enrollmentRouter
