import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('Mongoose connected')
})
