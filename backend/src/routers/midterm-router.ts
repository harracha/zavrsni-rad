import { Router, Request, Response } from 'express'
import { sessionUserExists } from '../lib/middleware/session-middleware'
import { userHasRole } from '../lib/middleware/user-role-middleware'
import { MidtermType, Prisma, Version } from '@prisma/client'
import {
  create,
  createMany,
  deleteMidterm,
  list,
  updateMidterm,
} from '../controllers/midterm-controller'
import { testFilter } from '../types/testFilter'
import { midtermFilterParams } from '../types/midterm-filter'
import { parseMidtermFilterParams } from '../utils/url-parser/midterm-query-parser'
import { midtermPointsValidation } from '../lib/middleware/data-validation/midterm'

const midtermRouter = Router()

midtermRouter.post(
  '/createMany',
  sessionUserExists,
  midtermPointsValidation,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (req: Request, res: Response, next: Function) => {
    const midtermData: any = req.body

    try {
      const midterms = await createMany(midtermData)
      res.status(200).send(midterms)
    } catch (error) {
      console.error(error)
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

midtermRouter.post(
  '/create',
  sessionUserExists,
  midtermPointsValidation,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (req: Request, res: Response, next: Function) => {
    const midtermData: Prisma.MidtermCreateInput = req.body
    try {
      const midterm = await create(midtermData)
      res.status(200).send(midterm)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

midtermRouter.put(
  '/update/:midtermId',
  sessionUserExists,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (req: Request, res) => {
    const midtermId = req.params.midtermId
    const updateData: Prisma.MidtermUpdateInput = req.body

    try {
      const updatedMidterm = await updateMidterm(midtermId, updateData)
      res.status(200).send(updatedMidterm)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

midtermRouter.delete(
  '/delete/:midtermId',
  sessionUserExists,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (req: Request, res: Response, next: Function) => {
    const midtermId = req.params.midtermId

    try {
      const deletedMidterm = await deleteMidterm(midtermId)
      res.status(200).send(deletedMidterm)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

midtermRouter.get(
  '/list',
  sessionUserExists,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (
    req: Request<any, any, any, midtermFilterParams>,
    res: Response,
    next: Function,
  ) => {
    const filter: midtermFilterParams = parseMidtermFilterParams(req.url)
    try {
      const midterms = await list(filter)
      res.status(200).send(midterms)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

export default midtermRouter
