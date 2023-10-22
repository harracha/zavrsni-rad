import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import session from 'express-session'
import prisma from './src/lib/prisma';
import bodyParser from 'body-parser';
import teacherRouter from './src/routers/teacher-router';
import studentRouter from './src/routers/student-router';
import cors from 'cors';
import midtermRouter from './src/routers/midterm-router';
import labGroupRouter from './src/routers/labgroup-router';
import labExerciseRouter from './src/routers/labExercise-router';
import homeworkRouter from './src/routers/homework-router';
import examRouter from './src/routers/exam-router';
import classGroupRouter from './src/routers/classgroup-router';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json())
app.use(cors())

app.use(
  session({
    secret: process.env.EXPRESS_SECRET_KEY || 'secret-key', // Replace with a strong secret key for session encryption
    resave: false, // Don't save sessions if they haven't been modified
    saveUninitialized: false, // Don't save new, uninitialized sessions
    cookie: {
      maxAge: 3600000, // Session duration in milliseconds (1 hour in this example)
    },
  })
);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello world')
});

app.use('/teacher', teacherRouter)
app.use('/student', studentRouter)
app.use('/midterm', midtermRouter)
app.use('/labGroup', labGroupRouter)
app.use('/labExercise', labExerciseRouter)
app.use('/homework', homeworkRouter)
app.use('/exam', examRouter)
app.use('/classGroup', classGroupRouter)



app.listen(port, () => {
  console.log(`Server is at http://localhost:${port}`);
});


// COULD BE USEFUL

// function requireAuth(req: Request, res: Response, next: Function) {
//   if (req.session.username) {
//     next();
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// }

// router.get('/protected-route', requireAuth, (req: Request, res: Response) => {
//   res.send('This route is protected. User is authenticated.');
// });
