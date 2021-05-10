import mongoose from 'mongoose'

interface IUser {
  email: string;
  otp: string;
  token: string;
  verified:boolean;
}

interface userModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: IUser): TodoDoc
}

interface TodoDoc extends mongoose.Document {
  email: string;
  otp: string;
  token: string;
  verified:boolean;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String, 
    required: true
  },
  token: {
    type: String, 
    required: true
  },
  verified: {
    type: Boolean, 
    required: true
  }
})

userSchema.statics.build = (attr: IUser) => {
  return new User(attr)
}

const User = mongoose.model<TodoDoc, userModelInterface>('User', userSchema)
export { User }




