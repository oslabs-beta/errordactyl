import { parse as parser } from 'https://deno.land/std@0.166.0/flags/mod.ts';
import { test } from './test/test.ts';
import { parse } from './parse/parse.ts';
import { init } from './init.ts';

const args = parser(Deno.args);

//handle arguments
switch (args._[0]) {
  case 'init':
    init();
    break;
  case undefined:
    args.f ? parse() : test();
    break;
}
