export interface endpoint {
  path: string,
  // params?: RegExpMatchArray | null,
  body?: Record<string, unknown>,
  headers?: Record<string, unknown>
}

export interface methodCacheExtended {
  GET: endpoint[],
  POST: endpoint[],
  PUT: endpoint[],
  PATCH: endpoint[],
  DELETE: endpoint[]
}

export interface methodCache {
  get: Array<string>;
  post: Array<string>;
  put: Array<string>;
  delete: Array<string>;
  patch: Array<string>;
}

export interface testMethods {
  testAll: () => void,
  testOne: (method:string, endpoint:string, body?:string) => void
}

export interface config {
  serverPath: string,
  routesPath: string,
  filePaths: string[],
  endpoints: methodCacheExtended
  PORT?: number
}