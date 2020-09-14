import mongoose, { Schema } from 'mongoose'

const MODEL_NAME = 'Message'

const messageSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

const MessageModel = mongoose.model(MODEL_NAME, messageSchema)
export default MessageModel
