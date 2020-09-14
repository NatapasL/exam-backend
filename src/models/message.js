import mongoose, { Schema } from 'mongoose'

const MODEL_NAME = 'Message'

const messageSchema = new Schema({
  body: String,
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})

const Message = mongoose.model(MODEL_NAME, messageSchema)
export default Message
