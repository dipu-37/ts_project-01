
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { notFound } from './middlewares/notFound';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import cookieParser  from 'cookie-parser';


const app : Application = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin : ['http://localhost:5173']
}))



// application route
app.use('/api/v1',router)


// test route 
app.get('/', (req:Request,res:Response) => {
  res.send('Hello World!')
})


// middleware - globalError handler;
app.use(globalErrorHandler);

// not found 
app.use(notFound);

export default app;