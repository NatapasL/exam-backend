import mongoose from 'mongoose'

process.env.DB_URL = 'mongodb://localhost:27017/test'

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('Mongoose connected')
})
