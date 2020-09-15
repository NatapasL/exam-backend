import mongoose from 'mongoose'

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/exam-backend'

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('Mongoose connected')
})
