import mongoose, { Schema } from 'mongoose'

const MODEL_NAME = 'User'

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

const UserModel = mongoose.model(MODEL_NAME, messageSchema)
export default UserModel
