#!/bin/bash
deno run --allow-net ./client-repo/server.ts &
DENO_PID=$!
sleep .5
curl localhost:3000/
curl localhost:3000/books
curl -X POST[object Object]localhost:3000/
 curl -X DELETE localhost:3000/books/:id
curl -X PATCH[object Object]localhost:3000/books/:id
kill $DENO_PID