
## Deno Installation

Fork and clone the repository and install the errordactyl (edact) script into Deno's global bin.
* **Note:** application permissions are still being scoped and optimized. 

```sh
deno install -A 'path To edact.ts'
```
we are working on publishing to Deno Land so that installation can be more streamlined!

## Configuration

Suppose we have following example of a route built using Oak.js listening for requests from port 3000. An exception is thrown on purpose in order to test the error handling functionality of the tool. 

```ts
import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';

const router = new Router();
router.get('/', (ctx) => {
  ctx.response.body = "Get Request";
  throw new EvalError;
});
```

Initialize errordactyl in the project that you are currently testing with  `edact init` and complete the inital prompts to create a config file in `projectRoot/_errordactyl/`

```sh
edact init
```

After the initial setup is complete, compile your executable bash script by running `edact -f` to populate the file with all of the endpoint routes.

```sh
edact -f
```

Edit the request body, parameters, and headers in  `/_errordactyl/config.json` and simply run `edact` to invoke the generated shell script, testing all of the detected endpoints from the configuration file. 

```sh
edact
```

The generated output from the CLI would be:

```javascript
[
  {
    message: "[uncaught application error]: Error - ",
    request: { url: "http://localhost:3000/", method: "GET", hasBody: false },
    response: { status: 200, type: undefined, hasBody: true, writable: true },
    location: "/Users/Ernietheerrordactyl/Documents/test/server/routes/router.ts",
    lineNo: 7,
    colNo: 11
  }
]
```

The output error data is returned as a JSON object, writing all of the error stack trace data into a readable format. 
