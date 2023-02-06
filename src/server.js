import http from "node:http" // Internal libraries require "node:" prefix
import { Database } from "./middlewares/database.js"
import { json } from "./middlewares/json.js"
import { randomUUID } from 'node:crypto'

// CommonJS => require
// ESModules => import/export

// Node doesn't support ECMAScript modules by default, so a config is added to package.json


// Statefull application => has in memory data
// (therefore stateless doesnt)
const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)