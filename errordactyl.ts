const file: string = await Deno.readTextFile("router.ts");

interface methodCache {
    get: Array<string>,
    post: Array<string>,
    put: Array<string>,
    delete: Array<string>,
    patch: Array<string>
}

const methods: methodCache = {
    get: [],
    post: [],
    put: [],
    delete: [],
    patch: []
  }

// // better time complexity option
for (const method in methods) {
    const regex = new RegExp(`\\.${method}\\("(\\S)*"`, 'g');
    const endpoints: RegExpMatchArray|null = file.match(regex);
    if (endpoints) {
      for (const match of endpoints) {
      methods[method as keyof typeof methods].push(match.replace(`.${method}(`, '').replaceAll('"', ''));
    }
  }
}

console.log(methods);

// better space complexity option
import { readLines } from 'https://deno.land/std@0.78.0/io/mod.ts';
const file1 = await Deno.open('./router.ts');
for await (const line of readLines(file1)) {
  for (const method in methods) {
    const regex = new RegExp(`(?<=\\.${method}\\()\\'(.*)\\'`, 'g');
    const found = line.match(regex);
    if (found) {
      const path = found[0].substring(1, found[0].length - 1);
      methods[method as keyof typeof methods].push(path);
    }
  }
}

console.log(methods);

