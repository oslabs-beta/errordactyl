import { Router } from './deps.ts';

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "Get Request";
    // console.log(ctx.response.body);
});

router.post("/", (ctx) => {
    ctx.response.body = "Post Request";
    // console.log(ctx.response.body);
});

router.get("/books", (ctx) => {
    ctx.response.body = "Get Request to /books";
    // console.log(ctx.response.body);
});

router.patch("/books/:id", (ctx) => {
    ctx.response.body = `Patch Request to /books/${ctx.params.id}`;
    // console.log(ctx.response.body);
});

router.delete("/books/:id", (ctx) => {
    ctx.response.body = `Delete Request to /books/${ctx.params.id}`;
    // console.log(ctx.response.body);
});

export default router;