
## Deno Installation

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

When running our tool for the first time, running the `edact init` command will generate a configuration file in a step-by-step process in the command line to determine endpoints and setup the starting configuration file, while considering pre-existing conditions such as existing configuration files and server paths.

```sh
edact init
```

After the initial setup is complete and a configuration file is generated, compile your executable bash script by passing the `edact -f` command to populate the file with all of the endpoint routes, following any instructions the CLI outputs to the user.

```sh
edact -f
```

Now that all of the files have been generated, it is time to test your server. Back in our CLI, we would run the simple `edact` command to invoke our generated shell script, testing all of the detected endpoints from the configuration file. 

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
 
## Contributing

The main purpose of this repository is to provide a general overview of the architecture of the application. Development of the tool is ongoing and we are open to any contributions that may be provided from curious onlookers and users. 
