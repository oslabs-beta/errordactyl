import { parse } from 'https://deno.land/std@0.166.0/flags/mod.ts';

const args = parse(Deno.args);

const cmd = {
    init : ['deno', 'run', '-A', './errordactyl/init.ts'],
    test : ['deno', 'run', '-A', './errordactyl/test/test.ts'],
    parse : ['deno', 'run', '-A', './errordactyl/parse/parse.ts']
}

//handle arguments
switch (args._[0]) {
    case 'init':
        await Deno.run({cmd:cmd.init}).status();
        break;
    case undefined:
        args.f ? await Deno.run({cmd:cmd.parse}).status() : await Deno.run({cmd:cmd.test}).status();
        break;
}
