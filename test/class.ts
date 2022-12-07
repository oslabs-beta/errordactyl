// class encapsulation of test logic
import { config as dotenv } from "https://deno.land/x/dotenv/mod.ts";
const env = dotenv();

import { endpoint, config } from '../types.ts';
import errors from './error.ts';

export default class Test {
  config: config;
  script: string;

  constructor() {
    this.config = {} as config;
    this.script = '';
  }

  td = (d: Uint8Array) => new TextDecoder().decode(d);

  startScript = async ():Promise<void> =>  {
    this.config = await Deno.readTextFile('./_errordactyl/config.json').then(res => JSON.parse(res));
    const pathToServer:string = this.config.serverPath;
    this.script = `#!/bin/bash\ndeno run --allow-net --allow-read ${pathToServer} &\nDENO_PID=$!\nsleep .5\n`;
    const colorVars = 
    `NC='\\0033[0m'
    BPURPLE='\\033[1;35m'
    BGREEN='\\033[1;32m'`;

    this.script += colorVars;
    return;
  }

  routeScripter = (method:string, data:Array<endpoint> | string, body?:string) => {
  // retrieve PORT in order of priority
  const PORT: number = this.config.PORT || Number(env.PORT) || 3000;
  // maybe refactor this giant ternary lol
  Array.isArray(data)?
  method === ('GET'||'DELETE')?
    (data.forEach((endpoint, index) => {
      const getScript = `
        \n${method}${index}=$(curl -s localhost:${PORT}${endpoint.path})
        echo -e "\${BPURPLE}${method} to '${endpoint.path}': \${NC}\$GET${index}"
        `
      this.script += getScript;
    })):
    (
      data.forEach((endpoint, index) => {
        const postScript = `
          \n${method}${index}=$(curl -s -X ${method} -d '${JSON.stringify(endpoint.body)}' localhost:3000${endpoint.path})
          echo -e "\${BPURPLE}${method} to '${endpoint.path}': \${NC}\$${method}${index}"
        `
        this.script += postScript;
      })):
  method === ('GET'||'DELETE')?
    (this.script +=`
    \n${method}=$(curl -s localhost:3000${data})
    echo -e "\${BPURPLE}${method} to '${data}': \${NC}\$${method}"
    `
    ):
    this.script += `
    \n${method}=$(curl -s -X ${method} -d ${body} localhost:3000${data})
    echo -e "\${BPURPLE}${method} to '${data}': \${NC}\$${method}"
    `
  return;
  }

  writeAndRun = async () => {
    this.script += `\nkill $DENO_PID`;

    await Deno.writeTextFile('./_errordactyl/test.sh', this.script);
  
    await Deno.run({cmd: ['chmod', '+x', './_errordactyl/test.sh']}).status();
  
    const p = await Deno.run({cmd: ['./_errordactyl/test.sh'], stdout:'piped', stderr:'piped'});
    await p.status();
  
    console.log('%cYour server responded:%c\n', 'background-color: white', 'background-color: transparent');
    console.log(this.td(await p.output()).trim())

    const STDERR = (this.td(await p.stderrOutput()).trim())
    console.log(errors(STDERR));
  }

  testAll = async () => {
    await this.startScript();
    const endpoints = this.config.endpoints;
    
    for (const method in endpoints) {
      this.routeScripter(method, endpoints[method as keyof typeof endpoints])
    }

    this.writeAndRun();
  }

  testOne = async (method:string, endpoint:string, body?:string) => {
    await this.startScript();
    this.routeScripter(method, endpoint, body);

    this.writeAndRun();
  }
}