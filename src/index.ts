import express from 'express';
import mongoose from 'mongoose'
import { userRouter } from './routes/user'
import cors from 'cors'
require('dotenv').config() 
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(userRouter)

mongoose.connect(process.env.MongoUri || 'mongodb://localhost:27017/test-mailer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to database')
})

app.listen(process.env.PORT || 5000, () => {
  console.log('server is listening on port 3000')
})