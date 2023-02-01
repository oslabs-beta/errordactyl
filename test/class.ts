const fs = require('fs/promises');
const { exec, spawn } = require('node:child_process')

// class encapsulation of test logic
import { endpoint, config } from '../types';
import errors from './error';

export default class Test {
  config: config;
  script: string;

  constructor() {
    this.config = {} as config;
    this.script = '';
  }

  td = (d: Uint8Array) => new TextDecoder().decode(d);

  startScript = async ():Promise<void> =>  {
    // this.config = await Deno.readTextFile('./_errordactyl/config.json').then(res => JSON.parse(res));
    this.config = await fs.readFile('./_errordactyl/config.json').then(res => JSON.parse(res)); // fs.readFile
    const pathToServer:string = this.config.serverPath;
    // this.script = `#!/bin/bash\ndeno run --allow-net ${pathToServer} &\nDENO_PID=$!\nsleep .5\n`; // change CLI script command to use node
    this.script = `#!/bin/bash\nnode ${pathToServer} &\nDENO_PID=$!\nsleep .5\n`; // change CLI script command to use node
    const colorVars =
    `NC='\\0033[0m'
    BPURPLE='\\033[1;35m'
    BGREEN='\\033[1;32m'`;

    this.script += colorVars;
    return;
  }

  routeScripter = (method:string, data:Array<endpoint> | string, body?:string) => {
  Array.isArray(data)?
  method === ('GET'||'DELETE')?
    (data.forEach((endpoint, index) => {
      const getScript = `
        \n${method}${index}=$(curl -s localhost:3000${endpoint.path})
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
    console.log('writeAndRun Method invoked');
    // this.script += `\nkill $DENO_PID`;

    // await Deno.writeTextFile('./_errordactyl/test.sh', this.script);
    await fs.writeFile('./_errordactyl/test.sh', this.script); // fs.writeFile

    // await Deno.run({cmd: ['chmod', '+x', './_errordactyl/test.sh']}).status(); // figure out Node subprocess and re-wrtie
    // console.log('first subprocess');
    await spawn('chmod', ['+x', './_errordactyl/test.sh']); // figure out Node subprocess and re-write
    // await exec('chmod', ['+x', './_errordactyl/test.sh'], () => console.log('finished'))
    console.log('%cYour server responded:%c\n', 'background-color: white', 'background-color: transparent');

    // const p = await Deno.run({cmd: ['./_errordactyl/test.sh'], stdout:'piped', stderr:'piped'}); // figure out Node subprocess and re-write
    // console.log('second subprocess');
    const p = await spawn('./_errordactyl/test.sh', [], {stdio: 'pipe'});
    // const p = await exec('./_errordactyl/test.sh', [], () => console.log('finished'));
    console.log('%cYour server responded:%c\n', 'background-color: white', 'background-color: transparent');
    // console.log(p);

    p.stdout.on('data', (data) => {
      console.log('data1', this.td(data).trim())
    });

    // const STDERR = (this.td(await p.stderrOutput()).trim())
    p.stderr.on('data', (data) => {
      console.log('incomingErrorDataFromPipeline', this.td(data).trim());
      console.log('errorDataReturnedFromErrorFunctions', errors(this.td(data).trim())); // <---------------- !!!!
    })
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