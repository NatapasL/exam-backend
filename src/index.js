import './infra/mongoose'
import server from './infra/server'

const PORT = process.env.PORT || 4000

server.listen({ port: PORT }, () => {
  console.log(`Sever is listening to port ${PORT}`)
})
