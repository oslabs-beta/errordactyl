#!/bin/bash
deno run --allow-net ./server.ts &
DENO_PID=$!
sleep .5
curl localhost:3000/
curl localhost:3000/books
curl -X POST localhost:3000/
curl -X DELETE localhost:3000/books/:id
curl -X PATCH localhost:3000/books/:id
kill $DENO_PID