<<<<<<< HEAD
=======
interface endpoint {
  path: string,
  params?: RegExpMatchArray | null,
  body?: string
}

export interface methodCacheExtended {
  GET: endpoint[],
  POST: endpoint[],
  PUT: endpoint[],
  PATCH: endpoint[],
  DELETE: endpoint[]
}

>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
export interface methodCache {
  get: Array<string>;
  post: Array<string>;
  put: Array<string>;
  delete: Array<string>;
  patch: Array<string>;
}