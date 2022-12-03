import { endpoint } from '../types.ts';
import errors from './error.ts';

const td = (d: Uint8Array) => new TextDecoder().decode(d);

export async function test() {

  const config = await Deno.readTextFile('./_errordactyl/config.json').then(res => JSON.parse(res));

  const pathToServer:string = config.serverPath;

  let script = `#!/bin/bash\ndeno run --allow-net ${pathToServer} &\nDENO_PID=$!\nsleep .5\n`;

  const colorVars = 
  `NC='\\0033[0m'
  BPURPLE='\\033[1;35m'
  BGREEN='\\033[1;32m'`;
  script += colorVars;

  for (const method in config.endpoints) {
    addRoutes(method, config.endpoints[method]);
  }

  script += `\nkill $DENO_PID`;

  function addRoutes(method:string, arr:Array<endpoint>) {

    switch (method) {
      case 'GET':
        arr.forEach((endpoint, index) => {
          const getScript = `
            \nGET${index}=$(curl -s localhost:3000${endpoint.path})
            echo -e "\${BPURPLE}GET to '${endpoint.path}': \${NC}\$GET${index}"
          `
          script += getScript;
        })
        break;
      case 'POST':
        arr.forEach((endpoint, index) => {
          const postScript = `
            \nPOST${index}=$(curl -s -X POST -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo -e "\${BPURPLE}POST to '${endpoint.path}': \${NC}\$POST${index}"
          `
          script += postScript;
          // script += '\ncurl -s -X POST' + JSON.stringify(endpoint.body) + 'localhost:3000' + endpoint.path;
        })
        break;
      case 'PATCH':
        arr.forEach((endpoint, index) => {
          const patchScript = `
            \nPATCH${index}=$(curl -s -X PATCH -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo -e "\${BPURPLE}PATCH to '${endpoint.path}': \${NC}\$PATCH${index}"
          `
          script += patchScript;
        })
        break;
      case 'PUT':
        arr.forEach((endpoint, index) => {
          const putScript = `
            \nPUT${index}=$(curl -s -X PUT -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo -e "\${BPURPLE}PUT to '${endpoint.path}': \${NC}\$PUT${index}"
          `
          script += putScript;
        })
        break;
      case 'DELETE':
        arr.forEach((endpoint, index) => {
          const deleteScript = `
            \nDEL${index}=$(curl -s -X DELETE localhost:3000${endpoint.path})
            echo -e "\${BPURPLE}DELETE to '${endpoint.path}': \${NC}\$DEL${index}"
          `
          script += deleteScript;
        })
        break;
    }
  }
  
  await writeFile('./_errordactyl/test.sh', script);
  
  await Deno.run({cmd: ['chmod', '+x', './_errordactyl/test.sh']}).status();
  
  const p = await Deno.run({cmd: ['./_errordactyl/test.sh'], stdout:'piped', stderr:'piped'});

  await p.status();
  console.log('%cYour server responded:%c\n', 'background-color: white', 'background-color: transparent');
  console.log(td(await p.output()).trim())
  const STDERR = (td(await p.stderrOutput()).trim())

  console.log(errors(STDERR));
}

export async function testOne(method:string, endpoint:string, body?:string) {

  const config = await Deno.readTextFile('./_errordactyl/config.json').then(res => JSON.parse(res));

  const pathToServer:string = config.serverPath;

  let script = `#!/bin/bash\ndeno run --allow-net ${pathToServer} &\nDENO_PID=$!\nsleep .5\n`;

  const colorVars = 
      `NC='\\0033[0m'
      BPURPLE='\\033[1;35m'
      BGREEN='\\033[1;32m'`;
    script += colorVars;

  switch (method) {
    
    case 'GET':
      script += `
      \nGET=$(curl -s localhost:3000${endpoint})
      echo -e "\${BPURPLE}GET to '${endpoint}': \${NC}\$GET"
      `
    break;
    case 'POST':
      script += `
      \nPOST=$(curl -s -X POST -d '${body}' localhost:3000${endpoint})
      echo -e "\${BPURPLE}POST to '${endpoint}': \${NC}\$POST"
      `
    break;
    case 'PATCH':
      script += `
      \nPATCH=$(curl -s -X PATCH -d '${JSON.stringify(body)}' localhost:3000${endpoint})
      echo -e "\${BPURPLE}PATCH to '${endpoint}': \${NC}\$PATCH"
      `
    break;
    case 'PUT':
      script += `
      \nPATCH=$(curl -s -X PATCH -d '${JSON.stringify(body)}' localhost:3000${endpoint})
      echo -e"\${BPURPLE}PATCH to '${endpoint}': \${NC}\$PATCH"
      `
    break;
    case 'DELETE':
      script += `
      \nDELETE=$(curl -s -X DELETE localhost:3000${endpoint})
      echo -e "\${BPURPLE}DELETE to '${endpoint}': \${NC}\$DELETE"
      `
    break;
  }

  script += `\nkill $DENO_PID`;

  await writeFile('./_errordactyl/test.sh', script);

  await Deno.run({cmd: ['chmod', '+x', './_errordactyl/test.sh']}).status();

  const p = await Deno.run({cmd: ['./_errordactyl/test.sh'], stdout:'piped', stderr:'piped'});

  await p.status();

  console.log('%cYour server responded:%c\n', 'background-color: white', 'background-color: transparent');
  console.log(td(await p.output()).trim())
  const STDERR = (td(await p.stderrOutput()).trim())

  console.log(errors(STDERR));

}

async function writeFile(path:string, text:string): Promise<void> {
  return await Deno.writeTextFile(path, text);
}







