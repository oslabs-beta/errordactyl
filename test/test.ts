import { endpoint } from '../types.ts';

export async function test() {
  const td = (d: Uint8Array) => new TextDecoder().decode(d);
  
  const config = await Deno.readTextFile('./errordactyl.json').then(res => JSON.parse(res));
  
  const pathToServer:string = config.serverPath;
  
  let script = `#!/bin/bash\ndeno run --allow-net ${pathToServer} &\nDENO_PID=$!\nsleep .5`;
  
  for (const method in config.endpoints) {
    addRoutes(method, config.endpoints[method]);
  }
  
  function addRoutes(method:string, arr:Array<endpoint>) {
    switch (method) {
      case 'GET':
        arr.forEach(endpoint => {
          script += '\ncurl localhost:3000' + endpoint.path;
        })
        break;
      case 'POST':
        arr.forEach(endpoint => {
          script += '\ncurl -X POST' + endpoint.body + 'localhost:3000' + endpoint.path;
        })
        break;
      case 'PATCH':
        arr.forEach(endpoint => {
          script += '\ncurl -X PATCH' + endpoint.body + 'localhost:3000' + endpoint.path;
        })
        break;
      case 'PUT':
        arr.forEach(endpoint => {
          script += '\ncurl -X PUT' + endpoint.body + 'localhost:3000' + endpoint.path;
        })
        break;
      case 'DELETE':
        arr.forEach(endpoint => {
          script += '\n curl -X DELETE localhost:3000' + endpoint.path;
        })
        break;
    }
  }
  
  script += `\nkill $DENO_PID`;
  
  async function writeFile(path:string, text:string): Promise<void> {
    return await Deno.writeTextFile(path, text);
  }
  
  await writeFile('./errordactyl.sh', script);
  
  await Deno.run({cmd: ['chmod', '+x', './errordactyl.sh']}).status();
  
  const p = await Deno.run({cmd: ['./errordactyl.sh'], stdout:'piped', stderr:'piped'});
  
  console.log(await p.status());
  console.log('STDOUT:', td(await p.output()).trim());
  console.log('STDERR:', td(await p.stderrOutput()).trim());
}







