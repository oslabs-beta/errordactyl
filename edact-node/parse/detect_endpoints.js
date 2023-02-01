"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEndpointsWithParams = exports.detectEndpoints = void 0;
const fs = require('fs/promises');
// // better time complexity option
const detectEndpoints = async (path, methods) => {
    // let file = await Deno.readTextFile(path);
    let file = await fs.readFile(path); // replaced with Node's fs.readFile
    // strip comments from file
    file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    for (const method in methods) {
        const regex = new RegExp(`\\.${method}\\("(\\S)*"`, 'g');
        const endpoints = file.match(regex);
        if (endpoints) {
            for (const match of endpoints) {
                methods[method].push(match.replace(`.${method}(`, '').replaceAll('"', ''));
            }
        }
    }
};
exports.detectEndpoints = detectEndpoints;
const detectEndpointsWithParams = async (path, methods) => {
    // let file = await Deno.readTextFile(path);
    let file = await fs.readFile(path); // replaced with Node's fs.readFile
    // strip comments from file
    file = file.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    // iterate over methods objects and match method in file
    for (const method in methods) {
        const regex = new RegExp(`\\.${method}\\("(\\S)*"`, 'gi');
        const endpoints = file.match(regex);
        if (endpoints) {
            for (const match of endpoints) {
                const path = match.replace(`.${method.toLowerCase()}(`, '').replaceAll('"', '');
                // // check for params and create params array
                // const params: RegExpMatchArray|null = path.match(/:(\S)*/g);
                // const endpoint = params ? {path, params} : {path};
                let endpoint = { path };
                if (method != 'GET' && method != 'DELETE') {
                    endpoint = { path, body: {} };
                }
                methods[method].push(endpoint);
            }
        }
    }
};
exports.detectEndpointsWithParams = detectEndpointsWithParams;
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
