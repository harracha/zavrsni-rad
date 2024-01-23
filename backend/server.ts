import express, { Express, Request, Response, Application } from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import bodyParser from 'body-parser'
import teacherRouter from './src/routers/teacher-router'
import studentRouter from './src/routers/student-router'
import cors from 'cors'
import midtermRouter from './src/routers/midterm-router'
import labGroupRouter from './src/routers/labGroup-router'
import labExerciseRouter from './src/routers/labExercise-router'
import homeworkRouter from './src/routers/homework-router'
import examRouter from './src/routers/exam-router'
import classGroupRouter from './src/routers/classGroup-router'
import authRouter from './src/routers/auth-router'
import { type SystemRole } from '@prisma/client'
import enrollmentRouter from './src/routers/enrollment-router'
import resultsRouter from './src/routers/results-router'

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(
  cors({
    origin: process.env.FE_URL,
  }),
)

// for logging endpoints and methods
app.use((req: Request, res: Response, next: Function) => {
  // ANSI escape code for yellow text color
  const yellowText = '\x1b[33m'
  // ANSI escape code to reset text color to the default
  const resetText = '\x1b[0m'

  console.log(
    `${yellowText}Request received for ${req.method} ${req.url}${resetText}\n`,
  )

  next()
})

app.use(
  session({
    secret: process.env.EXPRESS_SECRET_KEY || 'secret-key', // Replace with a strong secret key for session encryption
    resave: false, // Don't save sessions if they haven't been modified
    saveUninitialized: false, // Don't save new, uninitialized sessions
    cookie: {
      maxAge: 3600000, // Session duration in milliseconds (1 hour in this example)
    },
  }),
)

declare module 'express-session' {
  export interface SessionData {
    user: { email: string; role: SystemRole }
  }
}

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello world')
})

app.use('/auth', authRouter)
app.use('/teacher', teacherRouter)
app.use('/student', studentRouter)
app.use('/midterm', midtermRouter)
app.use('/labGroup', labGroupRouter)
app.use('/labExercise', labExerciseRouter)
app.use('/homework', homeworkRouter)
app.use('/exam', examRouter)
app.use('/classGroup', classGroupRouter)
app.use('/enrollment', enrollmentRouter)
app.use('/results', resultsRouter)

app.listen(port, () => {
  console.log(`Server is at http://localhost:${port}\n\n`)
})
