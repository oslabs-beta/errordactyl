import { endpoint, config } from '../types.ts';
import errors from './error.ts';

const td = (d: Uint8Array) => new TextDecoder().decode(d);
// declare config and script globally but do not assign values outside of functions
let config: config;
let script: string;

const startScript = async ():Promise<void> =>  {
  config = await Deno.readTextFile('./_errordactyl/config.json').then(res => JSON.parse(res));
  const pathToServer:string = config.serverPath;

  let script = `#!/bin/bash\ndeno run -A ${pathToServer} &\nDENO_PID=$!\nsleep 2\n`;

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
    (data.forEach((endpoint, index) => {
      const getScript = `
        \n${method}${index}=$(curl -s localhost:3000${endpoint.path})
        echo -e "\${BPURPLE}${method} to '${endpoint.path}': \${NC}\$GET${index}"
        `
      script += getScript;
    })):
    (
      data.forEach((endpoint, index) => {
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

  await Deno.writeTextFile('./_errordactyl/test.sh', script);
  
  await Deno.run({cmd: ['chmod', '+x', './_errordactyl/test.sh']}).status();
  
  const p = await Deno.run({cmd: ['./_errordactyl/test.sh'], stdout:'piped', stderr:'piped'});
  await p.status();
  
  console.log('%cYour server responded:%c\n', 'background-color: white', 'background-color: transparent');
  console.log(td(await p.output()).trim())

  const STDERR = (td(await p.stderrOutput()).trim())
  console.log(errors(STDERR));
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








