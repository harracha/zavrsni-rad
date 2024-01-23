import { Prisma, Student } from '@prisma/client'
import { Request, Response } from 'express'

export const homeworkPointsValidation = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  const homeworkData: Prisma.HomeworkUncheckedCreateInput[] = Array.isArray(
    req.body,
  )
    ? req.body
    : Array.from(req.body)

  homeworkData.map(async homework => {
    if (homework.points > 1 || homework.points < 0) {
      res.status(400).send({
        message: `Bodovi moraju biti u rasponu [0,1]. Vaš unos: ${homework.points}`,
      })
    }
  })
  next()
}
