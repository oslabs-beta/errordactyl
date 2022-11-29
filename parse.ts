import findFiles from './find_files.ts';
<<<<<<< HEAD
import detectEndpoints from './detect_endpoints.ts';
import { methodCache } from './types.ts';
=======
import { detectEndpoints, detectEndpointsWithParams } from './detect_endpoints.ts';
import { methodCache, methodCacheExtended } from './types.ts';
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
// check if user wants to overwrite file paths in json file

const methods: methodCache = {
  get: [],
  post: [],
  put: [],
  delete: [],
  patch: []
}
<<<<<<< HEAD
=======
const methodsExtended: methodCacheExtended = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: [],
  PATCH: []
}
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6

let config = await Deno.readTextFile('./errordactyl.json').then(response => JSON.parse(response));
let files: string[] | undefined = config.filePaths;

<<<<<<< HEAD
const overwritePaths = confirm('Do you want to overwrite file paths in errordactyl.json?');

if (overwritePaths) {
    // find files in routes folder declared in config file
    const path = config.routesPath;
    files = await findFiles(path);
    console.log(files);
    // updates array of file names in config
    config.filePaths = files;
    await Deno.writeTextFile('./errordactyl.json', JSON.stringify(config));
=======
// check if filePaths is empty, if not ask user if they want to overwrite the paths listed there

if (files && files.length > 0) {
  const overwritePaths = confirm('Do you want to overwrite file paths in errordactyl.json?');

  if (overwritePaths) {
    // find files in routes folder declared in config file
    const path = config.routesPath;
    files = await findFiles(path);
    // console.log(files);
    // updates array of file names in config
    config.filePaths = files;
    await Deno.writeTextFile('./errordactyl.json', JSON.stringify(config));
  }

} else {
  // find files in routes folder declared in config file
  const path = config.routesPath;
  files = await findFiles(path);
  console.log(files);
  // updates array of file names in config
  config.filePaths = files;
  await Deno.writeTextFile('./errordactyl.json', JSON.stringify(config));
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
}

// use filePaths array to grab routes 
// iterate over config.filePaths
files?.map((file: string) => {
<<<<<<< HEAD
  detectEndpoints(file, methods);
=======
  // adds to single methodCache as each file is read
  detectEndpointsWithParams(file, methodsExtended);
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
})

// print methods to config
config = await Deno.readTextFile('./errordactyl.json').then(response => JSON.parse(response));
<<<<<<< HEAD
config.endpoints = methods;
=======
config.endpoints = methodsExtended;
>>>>>>> e0824929f5a7b48a360c9d9290bf3d42a907c6e6
await Deno.writeTextFile('./errordactyl.json', JSON.stringify(config));
console.log('Successfully detected server routes; wrote to errordactyl config\nPlease input request data for applicable endpoints');

// could ask user to either manually enter in config file, or enter in command line?