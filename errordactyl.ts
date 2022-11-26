const td = (d: Uint8Array) => new TextDecoder().decode(d);

const config = await Deno.readTextFile('./errordactyl.json').then(res => JSON.parse(res));

const pathToServer:string = Deno.args[0];

let script = `#!/bin/bash\ndeno run --allow-net ${pathToServer} &\nDENO_PID=$!\nsleep .5`;

for (const key in config.endpoints) {
  addRoutes(key, config.endpoints[key]);
}

script += `\nkill $DENO_PID`;

function addRoutes(method:string, arr:Array<string>) {
  switch(method) {
    case 'get':
      arr.forEach((route:string) => {
        script += `\ncurl localhost:3000` + route;
      })
      break;
    case 'post':
      arr.forEach((route:string) => {
        script += `\ncurl -X POST localhost:3000` + route;
      })
      break;
    case 'patch':
      arr.forEach((route:string) => {
        script += `\ncurl -X PATCH localhost:3000` + route;
      })
      break;
    case 'put':
      arr.forEach((route:string) => {
        script += `\ncurl -X PUT localhost:3000` + route;
      })
      break;
    case 'delete':
      arr.forEach((route:string) => {
        script += `\ncurl -X DELETE localhost:3000` + route;
      })
  }
}

async function writeFile(path:string, text:string): Promise<void> {
  return await Deno.writeTextFile(path, text);
}

await writeFile('./script.sh', script);

await Deno.run({cmd: ['chmod', '+x', 'script.sh']}).status();

const p = await Deno.run({cmd: ['./script.sh'], stdout:'piped', stderr:'piped'});

console.log(await p.status());
console.log('STDOUT:', td(await p.output()).trim());
console.log('STDERR:', td(await p.stderrOutput()).trim());






