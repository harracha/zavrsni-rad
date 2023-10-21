import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

import prisma from './src/lib/prisma';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello world')
});


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});