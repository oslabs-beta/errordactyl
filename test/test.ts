const fs = require('fs');
const { spawn } = require('node:child_process');

import { endpoint, config } from '../types';
import errors from './error';

const td = (d: Uint8Array) => new TextDecoder().decode(d);
// declare config and script globally but do not assign values outside of functions
let config: config;
let script: string;

const startScript = async ():Promise<void> =>  {
  // config = await Deno.readTextFile('./_errordactyl/config.json').then(res => JSON.parse(res));
  config = await fs.readFile('./_errordactyl/config.json').then(res => JSON.parse(res)); // fs.readFile
  const pathToServer:string = config.serverPath;

  let script = `#!/bin/bash\ndeno run -A ${pathToServer} &\nDENO_PID=$!\nsleep 2\n`; // update to Node File

  const colorVars =
  `NC='\\0033[0m'
  BPURPLE='\\033[1;35m'
  BGREEN='\\033[1;32m'`;

  script += colorVars;
  return;
}

const routeScripter = (method:string, data:Array<endpoint> | string, body?:string) => {

  Array.isArray(data)?
  method === ('GET'||'DELETE')?
    (data.forEach((endpoint, index) => { // each of the template literal HTTP requests must be rewritten to express
      const getScript = `
        \n${method}${index}=$(curl -s localhost:3000${endpoint.path})
        echo -e "\${BPURPLE}${method} to '${endpoint.path}': \${NC}\$GET${index}"
        `
      script += getScript;
    })):
    (
      data.forEach((endpoint, index) => { // each of the template literal HTTP requests must be rewritten to express
        const postScript = `
          \n${method}${index}=$(curl -s -X ${method} -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
          echo -e "\${BPURPLE}${method} to '${endpoint.path}': \${NC}\$${method}${index}"
        `
        script += postScript;
      })):
  method === ('GET'||'DELETE')?
    (script +=`
    \n${method}=$(curl -s localhost:3000${data})
    echo -e "\${BPURPLE}${method} to '${data}': \${NC}\$${method}"
    `
    ):
    script += `
    \n${method}=$(curl -s -X ${method} -d ${body} localhost:3000${data})
    echo -e "\${BPURPLE}${method} to '${data}': \${NC}\$${method}"
    `
  return;
}

const writeAndRun = async () => {
  script += `\nkill $DENO_PID`;

  // await Deno.writeTextFile('./_errordactyl/test.sh', script);
  await fs.writeFile('./_errordactyl/test.sh', script); // fs.writeFile

  // await Deno.run({cmd: ['chmod', '+x', './_errordactyl/test.sh']}).status();

  await spawn('chmod', ['+x', './_errordactyl/test.sh'])

  // const p = await Deno.run({cmd: ['./_errordactyl/test.sh'], stdout:'piped', stderr:'piped'});

  const p = await spawn('./_errordactyl/test.sh', [], {stdio: 'pipe'})

  console.log('%cYour server responded:%c\n', 'background-color: white', 'background-color: transparent');

  p.stdout.on('data', (data) => {
    console.log(td(data).trim())
  });

  // const STDERR = (this.td(await p.stderrOutput()).trim())
  p.stderr.on('data', (data) => {
    console.log(errors(td(data).trim())); // <---------------- !!!!
  })
}



export const testAll = async () => {
  await startScript();
  const endpoints = config.endpoints;

  for (const method in endpoints) {
    routeScripter(method, endpoints[method as keyof typeof endpoints])
  }

  writeAndRun();
}

export const testOne = async (method:string, endpoint:string, body?:string) => {
  await startScript();
  routeScripter(method, endpoint, body);

  writeAndRun();
}

// export const testMethods: testMethods = {
//   testAll: testAll,
//   testOne: testOne
// }








