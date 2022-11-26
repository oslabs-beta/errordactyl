import { Application } from './deps.ts';
import router from './test/test1/test2/router.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port:3000});