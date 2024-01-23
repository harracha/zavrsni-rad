import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

export const examPointsValidation = (
  req: Request,
  res: Response,
  next: Function,
) => {
  const examData: Prisma.ExamUncheckedCreateInput[] = Array.isArray(req.body)
    ? req.body
    : Array.from(req.body)

  examData.map(exam => {
    if (exam.points_written && exam.points_oral) {
      if (exam.points_written < 0 || exam.points_written > 52) {
        res
          .status(400)
          .send({
            message: `Bodovi iz pismenog dijela ispita moraju biti u rasponu [0,52].\n Vaš unos: ${exam.points_written}. ID ispita: ${exam.examId}`,
          })
      }
      if (exam.points_oral < 0 || exam.points_oral > 24) {
        res
          .status(400)
          .send({
            message: `Bodovi iz usmenog dijela ispita moraju biti u rasponu [0,24]. Vaš unos: ${exam.points_oral}.\n ID ispita: ${exam.examId}`,
          })
      }
    } else {
      res
        .status(400)
        .send({
          message: `Za ispit sa ID-em: ${exam.examId} bodovi nisu uneseni. Molimo ispravite unos.`,
        })
    }
  })
  next()
}

export default examPointsValidation
