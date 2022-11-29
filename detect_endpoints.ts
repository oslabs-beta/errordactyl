<<<<<<< HEAD
import { methodCache } from './types.ts';


// // better time complexity option
const detectEndpoints = async (path: string, methods: methodCache) => {
=======
import { methodCache, methodCacheExtended } from './types.ts';


// // better time complexity option
export const detectEndpoints = async (path: string, methods: methodCache) => {
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
  let file = await Deno.readTextFile(path);
  // strip comments from file
  file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

  for (const method in methods) {
    const regex = new RegExp(`\\.${method}\\("(\\S)*"`, 'g');
    const endpoints: RegExpMatchArray|null = file.match(regex);
    if (endpoints) {
      for (const match of endpoints) {
      methods[method as keyof typeof methods].push(match.replace(`.${method}(`, '').replaceAll('"', ''));
      }
    }
  }

}

<<<<<<< HEAD
=======
export const detectEndpointsWithParams = async (path: string, methods: methodCacheExtended) => {
  let file = await Deno.readTextFile(path);
  // strip comments from file
  file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  // iterate over methods objects and match method in file
  for (const method in methods) {
    const regex = new RegExp(`\\.${method}\\("(\\S)*"`, 'gi');
    const endpoints: RegExpMatchArray|null = file.match(regex);
    if (endpoints) {
      for (const match of endpoints) {
        const path: string = match.replace(`.${method.toLowerCase()}(`, '').replaceAll('"', '');
        // check for params and create params array
        const params: RegExpMatchArray|null = path.match(/:(\S)*/g);
        const endpoint = params ? {path, params} : {path};
        methods[method as keyof typeof methods].push(endpoint);
      }
    }
  }
}

// {
//   get: ['/endpoint'],
//   get: [{
//     endpoint: '/endpoint',
//     params: [] <-- only create if params are detected
//   }],
//   post: [
//     {
//     endpoint: '/endpoint',
//     params: [],
//     body: {}
//     }
//   ]
// }

>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
// better space complexity option
// import { readLines } from 'https://deno.land/std@0.78.0/io/mod.ts';

// const spaceDetect = async (file: string) => {
//   const stream = await Deno.open(file);
//   for await (const line of readLines(stream)) {
//     for (const method in methods) {
//       const regex = new RegExp(`(?<=\\.${method}\\()\\'(.*)\\'`, 'g');
//       const found = line.match(regex);
//       if (found) {
//         const path = found[0].substring(1, found[0].length - 1);
//         methods[method as keyof typeof methods].push(path);
//       }
//     }
//   }
// }

<<<<<<< HEAD

export default detectEndpoints;
=======
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
