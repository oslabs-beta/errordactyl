import { endpoint } from '../types.ts';

export async function test() {
  const td = (d: Uint8Array) => new TextDecoder().decode(d);
  
  const config = await Deno.readTextFile('./_errordactyl/config.json').then(res => JSON.parse(res));
  
  const pathToServer:string = config.serverPath;
  
  let script = `#!/bin/bash\ndeno run --allow-net ${pathToServer} &\nDENO_PID=$!\nsleep .5`;
  
  for (const method in config.endpoints) {
    addRoutes(method, config.endpoints[method]);
  }
  
  function addRoutes(method:string, arr:Array<endpoint>) {
    const colorVars = `
      NC='\\0033[0m'
      BPURPLE='\\033[1;35m'
      BGREEN='\\033[1;32m'`;
    script += colorVars;
    switch (method) {
      case 'GET':
        arr.forEach((endpoint, index) => {
          const getScript = `
            \nGET${index}=$(curl -s localhost:3000${endpoint.path})
            echo -e "\${BGREEN}GET to '${endpoint.path}':\${NC} \$GET${index}"
          `
          script += getScript;
        })
        break;
      case 'POST':
        arr.forEach((endpoint, index) => {
          const postScript = `
            \nPOST${index}=$(curl -s -X POST -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo -e "\${BGREEN}POST to '${endpoint.path}':\${NC} \$POST${index}"
          `
          script += postScript;
          // script += '\ncurl -s -X POST' + JSON.stringify(endpoint.body) + 'localhost:3000' + endpoint.path;
        })
        break;
      case 'PATCH':
        arr.forEach((endpoint, index) => {
          const patchScript = `
            \nPATCH${index}=$(curl -s -X PATCH -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo -e "\${BGREEN}PATCH to '${endpoint.path}':\${NC} \$PATCH${index}"
          `
          script += patchScript;
        })
        break;
      case 'PUT':
        arr.forEach((endpoint, index) => {
          const putScript = `
            \nPUT${index}=$(curl -s -X PUT -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo -e "\${BGREEN}PUT to '${endpoint.path}':\${NC} \$PUT${index}"
          `
          script += putScript;
        })
        break;
      case 'DELETE':
        arr.forEach((endpoint, index) => {
          const deleteScript = `
            \nDEL${index}=$(curl -s -X DELETE localhost:3000${endpoint.path})
            echo -e "\${BGREEN}DELETE to '${endpoint.path}':\${NC} \$DEL${index}"
          `
          script += deleteScript;
        })
        break;
    }
  }
  
  script += `\nkill $DENO_PID`;
  
  async function writeFile(path:string, text:string): Promise<void> {
    return await Deno.writeTextFile(path, text);
  }
  
  await writeFile('./_errordactyl/test.sh', script);
  
  await Deno.run({cmd: ['chmod', '+x', './_errordactyl/test.sh']}).status();
  
  const p = await Deno.run({cmd: ['./_errordactyl/test.sh'], stdout:'piped', stderr:'piped'});
  
  console.log(await p.status());
  console.log('%cYour server responded:%c\n', 'background-color: blue', 'background-color: transparent');
  console.log(td(await p.output()).trim())
  console.log('STDERR:', td(await p.stderrOutput()).trim());

}







