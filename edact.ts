import { parse as parser } from 'https://deno.land/std@0.166.0/flags/mod.ts';
import { test, testOne } from './test/test.ts';
import { parse } from './parse/parse.ts';
import { init } from './init.ts';

const args = parser(Deno.args);
console.log(args);
let body = '';

//handle arguments
switch (args._[0]) {
  case 'init':
    init();
    break;
  case undefined:
    if (args.b||args.body) body += (args.b||args.body);
    if (args.p||args.post) testOne('POST', args.p||args.post, body);
    else if (args.u||args.patch||args.put) testOne(args.patch?'PATCH':'PUT', args.u||args.patch||args.put, body);
    else if (args.g||args.get) testOne('GET', args.g||args.get);
    else if (args.d||args.delete) testOne('DELETE', args.d||args.delete);
    else if (args.f) parse();
    else test();
    break;
}


