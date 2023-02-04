const fs = require('fs/promises');

import findFiles from './find_files';
import { detectEndpoints, detectEndpointsWithParams } from './detect_endpoints';
import { methodCache, methodCacheExtended } from '../types';
const readline = require('readline/promises');
const rl = readline.createInterface(process.stdin, process.stdout);
// check if user wants to overwrite file paths in json file

const methods: methodCache = {
  get: [],
  post: [],
  put: [],
  delete: [],
  patch: []
}

const methodsExtended: methodCacheExtended = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: [],
  PATCH: []
}

export async function parse() {
  console.log('parse invoked');
  // let config = await Deno.readTextFile('./_errordactyl/config.json').then(response => JSON.parse(response));
  let config = await fs.readFile('./_errordactyl/config.json').then(response => JSON.parse(response)); // replaced with Node's fs.readFile
  console.log('config', config)
  let files: string[] | undefined = config.filePaths;

  // check if filePaths is empty, if not ask user if they want to overwrite the paths listed there

  if (files && files.length > 0) {
    const overwritePaths = await rl.question('Do you want to overwrite file paths in config.json?');
    if (overwritePaths) {
      // find files in routes folder declared in config file
      const path = config.routesPath;
      console.log('path', path);
      files = await findFiles(path);
      // console.log(files);
      // updates array of file names in config
      console.log('files', files);
      config.filePaths = files;
      // await Deno.writeTextFile('./_errordactyl/config.json', JSON.stringify(config));
      await fs.writeFile('./_errordactyl/config.json', JSON.stringify(config)); //use fs.writeFile (double check)
    }

  } else {
    // find files in routes folder declared in config file
    const path = config.routesPath;
    console.log('path', path);
    files = await findFiles(path);
    console.log('files',files);
    // updates array of file names in config
    config.filePaths = files;
    // await Deno.writeTextFile('./_errordactyl/config.json', JSON.stringify(config));
    await fs.writeFile('./_errordactyl/config.json', JSON.stringify(config)); //use fs.writeFile (double check)
  }

  // use filePaths array to grab routes
  // iterate over config.filePaths
  files?.map((file: string) => {
    // adds to single methodCache as each file is read
    detectEndpointsWithParams(file, methodsExtended);
  })

  // print methods to config
  // config = await Deno.readTextFile('./_errordactyl/config.json').then(response => JSON.parse(response));
  config = await fs.readFile('./_errordactyl/config.json').then(response => JSON.parse(response)); // use fs.readFile
  config.endpoints = methodsExtended;
  // await Deno.writeTextFile('./_errordactyl/config.json', JSON.stringify(config));
  await fs.writeFile('./_errordactyl/config.json', JSON.stringify(config));
  console.log('Successfully detected server routes; wrote to errordactyl config\nPlease input request data for applicable endpoints'); // fs.writeFile
  await rl.close();
  // could ask user to either manually enter in config file, or enter in command line?
}