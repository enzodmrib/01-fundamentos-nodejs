// users/:id
export function buildRoutePath(path) {
  // recognizing route parameters with regex
  const routeParametersRegex = /:([a-zA-z]+)/g

  // switching the route parameters for the actual regex
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  // generating the regex with the path created
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`) 

  return pathRegex
}