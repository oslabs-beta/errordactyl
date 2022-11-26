interface endpoint {
  path: string,
  params: RegExpMatchArray | null,
  body?: string
}

export interface methodCacheExtended {
  get: endpoint[],
  post: endpoint[],
  put: endpoint[],
  patch: endpoint[],
  delete: endpoint[]
}

export interface methodCache {
  get: Array<string>;
  post: Array<string>;
  put: Array<string>;
  delete: Array<string>;
  patch: Array<string>;
}