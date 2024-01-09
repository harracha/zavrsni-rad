import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'

const authRouter = Router()

authRouter.post(
    '/teacher/login',
    async (req: Request, res: Response, next: Function) => {
      const loginEmail: string = req.body.email
      const loginPassword: string = req.body.password
  
      if (!loginEmail || !loginPassword) {
         res.status(400).send('User data not defined correctly')
      }
  
      await prisma.teacher
        .findUnique({
          where: {
            email: loginEmail,
          },
          select: {
            email: true,
            password: true,
            Role: true,
          },
        })
        .then(response => {
          if (!response) {
             res.status(401).send('Incorrect email or password')
          } else {
            if (response.password !== loginPassword) {
               res.status(401).send('Incorrect email or password')
            }
            req.session.user = { email: response.email, role: response.Role }
          }
          res.status(200).send(req.session.user)
        })
        .catch(error => {
          res
            .status(500)
            .send({ error: error, message: 'Failed connecting to database' })
        })
    },
  )

  authRouter.post(
    '/student/login',
    async (req: Request, res: Response, next: Function) => {
      const loginEmail: string = req.body.email
      const loginPassword: string = req.body.password
  
      if (!loginEmail || !loginPassword) {
        res.status(400).send('User data not defined correctly')
      }
  
      await prisma.student
        .findUnique({
          where: {
            email: loginEmail,
          },
          select: {
            email: true,
            password: true,
            Role: true,
          },
        })
        .then(response => {
          if (!response) {
             res.status(401).send('Incorrect email or password')
          } else {
            if (response.password !== loginPassword) {
               res.status(401).send('Incorrect email or password')
            }
            req.session.user = { email: response.email, role: response.Role }
          }
          res.status(200).send(req.session.user)
        })
        .catch(error => {
          res
            .status(500)
            .send({ error: error, message: 'Failed connecting to database' })
        })
    },
  )

authRouter.post('/logout', async(req: Request, res:Response, next: Function) => {
  delete req.session.user
})

export default authRouter
