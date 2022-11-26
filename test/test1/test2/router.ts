import { Router } from '../../../deps.ts';

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "Hello World";
    console.log(ctx.response.body);
});

router.post("/", (ctx) => {
    ctx.response.body = "Hello Post Man";
    console.log(ctx.response.body);
});

router.get("/books", (ctx) => {
    ctx.response.body = "Hello Books";
    console.log(ctx.response.body);
});

router.patch("/books/:id", (ctx) => {
    ctx.response.body = "Hello Patch";
    console.log(ctx.response.body);
});

router.delete("/books/:id", (ctx) => {
    ctx.response.body = "Goodbye Book";
    console.log(ctx.response.body);
});

export default router;