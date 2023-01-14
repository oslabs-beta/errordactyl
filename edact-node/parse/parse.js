"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const fs = require('fs');
const find_files_1 = require("./find_files");
const detect_endpoints_1 = require("./detect_endpoints");
// check if user wants to overwrite file paths in json file
const methods = {
    get: [],
    post: [],
    put: [],
    delete: [],
    patch: []
};
const methodsExtended = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
    PATCH: []
};
async function parse() {
    // let config = await Deno.readTextFile('./_errordactyl/config.json').then(response => JSON.parse(response));
    let config = await fs.readFile('./_errordactyl/config.json').then(response => JSON.parse(response)); // replaced with Node's fs.readFile
    let files = config.filePaths;
    // check if filePaths is empty, if not ask user if they want to overwrite the paths listed there
    if (files && files.length > 0) {
        const overwritePaths = confirm('Do you want to overwrite file paths in config.json?');
        if (overwritePaths) {
            // find files in routes folder declared in config file
            const path = config.routesPath;
            files = await (0, find_files_1.default)(path);
            // console.log(files);
            // updates array of file names in config
            config.filePaths = files;
            // await Deno.writeTextFile('./_errordactyl/config.json', JSON.stringify(config));
            await fs.writeFile('./_errordactyl/config.json', JSON.stringify(config)); //use fs.writeFile (double check)
        }
    }
    else {
        // find files in routes folder declared in config file
        const path = config.routesPath;
        files = await (0, find_files_1.default)(path);
        console.log('files', files);
        // updates array of file names in config
        config.filePaths = files;
        // await Deno.writeTextFile('./_errordactyl/config.json', JSON.stringify(config));
        await fs.writeFile('./_errordactyl/config.json', JSON.stringify(config)); //use fs.writeFile (double check)
    }
    // use filePaths array to grab routes
    // iterate over config.filePaths
    files?.map((file) => {
        // adds to single methodCache as each file is read
        (0, detect_endpoints_1.detectEndpointsWithParams)(file, methodsExtended);
    });
    // print methods to config
    // config = await Deno.readTextFile('./_errordactyl/config.json').then(response => JSON.parse(response));
    config = await fs.readFile('./_errordactyl/config.json').then(response => JSON.parse(response)); // use fs.readFile
    config.endpoints = methodsExtended;
    // await Deno.writeTextFile('./_errordactyl/config.json', JSON.stringify(config));
    await fs.writeFile('./_errordactyl/config.json', JSON.stringify(config));
    console.log('Successfully detected server routes; wrote to errordactyl config\nPlease input request data for applicable endpoints'); // fs.writeFile
    // could ask user to either manually enter in config file, or enter in command line?
}
exports.parse = parse;
