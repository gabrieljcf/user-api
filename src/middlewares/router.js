import { Routes } from "../http/routes.js";
import { extractQueryParams } from "../http/support/extract-query-params.js";

export function router(request, response) {
  const { method, url } = request;

  const route = Routes.getRoutes().find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = request.url.match(route.path);
    const { query, ...params } = routeParams.groups;
    request.params = params;
    request.query = query ? extractQueryParams(query) : {};
    return route.handler(request, response);
  }

  return response.writeHead(404).end();
}
