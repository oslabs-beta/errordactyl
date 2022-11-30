import { Router } from '../../../deps.ts';
import errors from './error.ts';

const router = new Router();

function newFunc() {
    // conso.log("This is in New Func")
    const b = 3;
    return function () {
        console.log("This is in New Anon Func")
        // console.log(b.length.property)
    }
}

router.get("/", (ctx) => {
    ctx.response.body = "Get Request";
    newFunc()();
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