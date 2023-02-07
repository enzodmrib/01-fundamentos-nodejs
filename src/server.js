import http from "node:http" // Internal libraries require "node:" prefix
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-params.js"

// CommonJS => require
// ESModules => import/export

// Node doesn't support ECMAScript modules by default, so a config is added to package.json


// Statefull application => has in memory data
// (therefore stateless doesnt)

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)