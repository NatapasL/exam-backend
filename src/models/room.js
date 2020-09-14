import mongoose from 'mongoose'

const MODEL_NAME = 'Room'

const Schema = mongoose.Schema
const roomSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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

const RoomModel = mongoose.model(MODEL_NAME, roomSchema)
export default RoomModel
