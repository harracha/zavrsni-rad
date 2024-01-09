import { Router, Request, Response } from 'express'
import { sessionUserExists } from '../lib/middleware/session-middleware'
import { userHasRole } from '../lib/middleware/user-role-middleware'
import { ExamType, Prisma, Version } from '@prisma/client'
import {
  create,
  createMany,
  deleteExam,
  deleteExams,
  list,
  updateExam,
} from '../controllers/exam-controller'
import { testFilter } from '../types/testFilter'
import { examFilterParams } from '../types/exam-flter'
import { parseExamFilterParams } from '../utils/url-parser/exam-query-parser'
import { examPointsValidation } from '../lib/middleware/data-validation/exam'

const examRouter = Router()

examRouter.post(
  '/createMany',
  sessionUserExists,
  examPointsValidation,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (req: Request, res: Response, next: Function) => {
    const examData: Prisma.ExamCreateManyInput = req.body
    
    try {
      const exams = await createMany(examData)
      res.status(200).send(exams)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

// POTENCIJALNO SE NECE KORISTITI
examRouter.post(
  '/create',
  sessionUserExists,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (req: Request, res: Response, next: Function) => {
    const examData: Prisma.ExamCreateInput = req.body
    try {
      const exam = await create(examData)
      res.status(200).send(exam)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

examRouter.put(
  '/update/:examId',
  sessionUserExists,
  examPointsValidation,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (req: Request, res: Response, next: Function) => {
    const examId = req.params.examId
    const updateData: Prisma.ExamUpdateInput = req.body

    try {
      const updatedExam = await updateExam(examId, updateData)
      res.status(200).send(updatedExam)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

examRouter.delete(
  '/delete/:examId',
  sessionUserExists,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (req: Request, res: Response, next: Function) => {
    const examId = req.params.examId

    try {
      const deletedExam = await deleteExam(examId)
      res.status(200).send(deletedExam)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)

examRouter.delete('/delete',sessionUserExists,
userHasRole(['ADMIN', 'PROFESSOR']),
async (req: Request<any, any, examFilterParams, any>, res: Response, next: Function) => {
  const deleteFilter = req.body

  try {
    const deletedExams = await deleteExams(deleteFilter)
    res.status(200).send(deletedExams)
  } catch (error) {
    res.status(500).send({
      message: 'Greška pri spajanju na bazu podataka.',
      error: error,
    })
  }
} )


examRouter.get(
  '/list',
  sessionUserExists,
  userHasRole(['ADMIN', 'PROFESSOR']),
  async (
    req: Request<any, any, any, examFilterParams>,
    res: Response,
    next: Function,
  ) => {
    const filter: examFilterParams = parseExamFilterParams(req.url)
    try {
      const exams = await list(filter)
      res.status(200).send(exams)
    } catch (error) {
      res.status(500).send({
        message: 'Greška pri spajanju na bazu podataka.',
        error: error,
      })
    }
  },
)


export default examRouter
