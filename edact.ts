// import { parse as parser } from 'https://deno.land/std@0.166.0/flags/mod.ts'; // no longer needed as we are using Node and not Deno
import { parse } from './parse/parse.ts';
import { init } from './init.ts';
import Test from './test/class.ts'

const yargs = require('yargs/yargs');

// const args = parser(Deno.args);
const args = yargs(process.argv); // process.argv in Node for CLI arguments and using yargs to parse the arguments into an object
let body = '';

const test = new Test();

//handle arguments
switch (args._[0]) {
  case 'init':
    init();
    break;
  case undefined:
    if (args.b||args.body) body += (args.b||args.body);
    if (args.p||args.post) test.testOne('POST', args.p||args.post, body);
    else if (args.u||args.patch||args.put) test.testOne(args.patch?'PATCH':'PUT', args.u||args.patch||args.put, body);
    else if (args.g||args.get) test.testOne('GET', args.g||args.get);
    else if (args.d||args.delete) test.testOne('DELETE', args.d||args.delete);
    else if (args.f) parse();
    else test.testAll();
    break;
}


