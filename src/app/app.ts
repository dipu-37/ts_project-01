import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoute } from './modules/students/student.route'
import { userRoute } from './modules/users/user.router'
const app : Application = express()
app.use(cors())
app.use(express.json())



// application route
app.use('/api/v1/students',StudentRoute)
app.use('/api/v1/users',userRoute)

app.get('/', (req:Request,res:Response) => {
  res.send('Hello World!')
})


export default app;