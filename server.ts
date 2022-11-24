import { Application } from './deps.ts';
import router from './router.ts';
import errors from './error.ts';

console.log("new branch");

const app = new Application( {logErrors: false} );

app.addEventListener('error', (evt) => {errors(evt.error)})

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port:3000});

