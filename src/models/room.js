import mongoose from 'mongoose'

const MODEL_NAME = 'Room'

const Schema = mongoose.Schema
const roomSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    }
  ]
})

const Message = mongoose.model(MODEL_NAME, roomSchema)
export default Message
