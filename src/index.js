import './infra/mongoose'
import server from './infra/server'

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
