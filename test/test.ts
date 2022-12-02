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
    switch (method) {
      case 'GET':
        arr.forEach((endpoint, index) => {
          const getScript = `
            \nGET${index}=$(curl -s localhost:3000${endpoint.path})
            echo "GET to '${endpoint.path}': \$GET${index}"
          `
          script += getScript;
        })
        break;
      case 'POST':
        arr.forEach((endpoint, index) => {
          const postScript = `
            \nPOST${index}=$(curl -s -X POST -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo "POST to '${endpoint.path}': \$POST${index}"
          `
          script += postScript;
          // script += '\ncurl -s -X POST' + JSON.stringify(endpoint.body) + 'localhost:3000' + endpoint.path;
        })
        break;
      case 'PATCH':
        arr.forEach((endpoint, index) => {
          const patchScript = `
            \nPATCH${index}=$(curl -s -X PATCH -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo "PATCH to '${endpoint.path}': \$PATCH${index}"
          `
          script += patchScript;
        })
        break;
      case 'PUT':
        arr.forEach((endpoint, index) => {
          const putScript = `
            \nPUT${index}=$(curl -s -X PUT -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
            echo "PUT to '${endpoint.path}': \$PUT${index}"
          `
          script += putScript;
        })
        break;
      case 'DELETE':
        arr.forEach((endpoint, index) => {
          const deleteScript = `
            \nDEL${index}=$(curl -s -X DELETE localhost:3000${endpoint.path})
            echo "DELETE to '${endpoint.path}': \$DEL${index}"
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
  console.log('Your server responded:');
  console.log(td(await p.output()).trim())
  console.log('STDERR:', td(await p.stderrOutput()).trim());

}







