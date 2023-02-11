export interface endpoint {
  path: string,
  // params?: RegExpMatchArray | null,
  body?: Record<string, unknown>,
  headers?: Record<string, unknown>,
  response?: string
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

interface reqObjType {
  url: string,
  method: string,
  hasBody: boolean,
}

interface resObjType {
  status: string,
  type: string | undefined,
  hasBody: boolean,
  writable: boolean,
}

export interface strObjType {
  message: string,
  request: string,
  response: string,
  location: string | undefined,
  lineNo: string | undefined,
  colNo: string | undefined,
}

export interface finalObjType {
  message: string,
  request: reqObjType,
  response: resObjType,
  location: string | undefined,
  lineNo: string | undefined,
  colNo: string | undefined,
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
