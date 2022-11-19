import findFiles from './find_files.ts';
import { methodCache } from './types.ts';
// check if user wants to overwrite file paths in json file

const methods: methodCache = {
  get: [],
  post: [],
  put: [],
  delete: [],
  patch: []
}

const config = await Deno.readTextFile('./errordactyl.json').then(response => JSON.parse(response));

const overwritePaths = confirm('Do you want to overwrite file paths in errordactyl.json?');

if (overwritePaths) {
    // find files in routes folder declared in config file
    const path = config.routesPath;
    const files = await findFiles(path);
    console.log(files);
    // updates array of file names in config
    config.filePaths = files;
    await Deno.writeTextFile('./errordactyl.json', JSON.stringify(config));
}

// use filePaths array to grab routes 
// iterate over config.filePaths