import { Application } from './deps.ts';
import router from './test/test1/test2/router.ts';
import errors from './error.ts';

const app = new Application( {logErrors: false} );

app.addEventListener('error', (evt) => {errors(evt.error)})

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port:3000});

