// import { parse as parser } from 'https://deno.land/std@0.166.0/flags/mod.ts'; // no longer needed as we are using Node and not Deno
import { parse } from './parse/parse';
import { init } from './init';
import Test from './test/class'

const yargs = require('yargs/yargs');

// const args = parser(Deno.args);
const yargsArr = yargs(process.argv); // process.argv in Node for CLI arguments and using yargs to parse the arguments into an object
// console.log('.argv', yargsArr.argv);
// console.log('.argv._', yargsArr.argv._)
const {'_': args, '$0':paths, ...flags} = yargsArr.argv;

// console.log('args', args, 'flags', flags)
let body = '';
const objOfCLIArgs = {};
args.map((ele) => {
  objOfCLIArgs[ele] = true;
});

// console.log('objOfCLIArgs',objOfCLIArgs);

const test = new Test();

//handle arguments
switch (true) {
  case (objOfCLIArgs["init"]):
    init();
    break;
  case (args.length === 2):
    if (flags["b"]||flags["body"]) body += (flags["b"]||flags["body"]);
    if (flags["p"]||flags["post"]) test.testOne('POST', flags["p"]||flags["post"], body);
    else if (flags["u"]||flags["patch"]||flags["put"]) test.testOne(flags["patch"]?'PATCH':'PUT', flags["u"]||flags["patch"]||flags["put"], body);
    else if (flags["g"]||flags["get"]) test.testOne('GET', flags["g"]||flags["get"]);
    else if (flags["d"]||flags["delete"]) test.testOne('DELETE', flags["d"]||flags["delete"]);
    else if (flags["f"]) parse();
    else test.testAll();
    break;
}

