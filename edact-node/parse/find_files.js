"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
// read config file and store any user overrides
// const ROUTES = config.routes || './routes'
// default behavior of app, traverse routes folder looking for endpoints
// Deno.readDir
// need to check each DirEntry to see if it is itself a directory
// error handling for this step: check if provided path is a STRING => is a folder or a file in the directory (Deno.errors.NotFound) => does the folder contain routes
const findFiles = async (path) => {
    try {
        // check if path is a folder
        // const fileInfo = await Deno.stat(path);
        const fileInfo = await fs.stat(path); // node equivalent is fs.stat() but Node docs say using this before any other file manipulation is not recommended
        if (fileInfo.isDirectory) { // node docs say that isDirectory is a method definition that is invoked to return a boolean
            // console.log('this is a directory');
        }
        else {
            console.log('must provide a valid directory');
            return;
        }
        const files = [];
        const readDirs = async (folder) => {
            //for await (const dirEntry of Deno.readDir(folder)) {
            for await (const dirEntry of fs.readDir(folder)) { //use fs.readDir
                const entryPath = `${folder}/${dirEntry.name}`; // double check if the name property exists on dirEntry in Node
                // if we get to a directory call readDirs on it
                if (dirEntry.isDirectory) {
                    await readDirs(entryPath);
                }
                else {
                    files.push(entryPath);
                }
            }
            return;
        };
        await readDirs(path);
        // console.log('findFiles', files)
        return files;
    }
    catch (e) {
        // handle different errors here
        if (e instanceof Error)
            console.log(e); // unknown in Node. Closest I could find were Node.js error codes
    }
};
exports.default = findFiles;