import { endpoint, methodType } from '../../../types';
import { window, workspace, Uri } from 'vscode';
const { spawn } = require('node:child_process');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);


export const test = async (endpoints: endpoint[], port: string) => {

    // // spawn the server process in correct working directory
    // const subprocess = await spawn('deno', ['run', '-A', './server/server.ts'], {
    //     cwd: workspace.workspaceFolders[0].uri.fsPath,
    //     detached: true,
    //     shell: true
    //   });

    // // const { stdin, stdout } = await exec('curl -s localhost:3000/');
    // const { stdin, stdout } = await exec('curl -s localhost:3000/')
    // console.log(stdin);
    // console.log(stdout);

    // subprocess.on('close', () => console.log('subprocess closed'))

    // subprocess.kill();

    // cwd of child processes is user's root directory, need to cd into correct place
    const wsPath = workspace.workspaceFolders[0].uri.fsPath 
    const cdCommand = `cd ${wsPath}`

    const startServer = `npm start&`

    const p = await exec(cdCommand + '&&' + startServer);

    await exec('sleep 1')

    for (const endpoint of endpoints) {
        try {
            const { stdout, stderr } = await exec(`curl -s ${endpoint.method} localhost:${port}${endpoint.path}`)
            if (stdout) {
                endpoint.response = stdout;
            } else if (stderr) {
                endpoint.response = stderr;
            }
            
    
        } catch (e) {
            endpoint.response = e as string;
        }
        

    }



}
