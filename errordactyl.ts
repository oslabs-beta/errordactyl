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