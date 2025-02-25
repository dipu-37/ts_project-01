
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoute } from './modules/students/student.route'
import { userRoute } from './modules/users/user.router'
import { notFound } from './middlewares/notFound';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';


const app : Application = express()
app.use(cors())
app.use(express.json())



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