import { endpoint, methodType } from '../../../types';
import { window, workspace, Uri } from 'vscode';
const { spawn } = require('node:child_process');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

export const test = async (endpoints: endpoint[], port: string, directory: string) => {
    return new Promise((resolve, reject) => {
        const pathToWorkspace = workspace.workspaceFolders[0].uri.fsPath + directory;
        const subprocess = spawn('npm', ['start'], {
            cwd: pathToWorkspace,
            detached: true 
        });
        subprocess.on('spawn', async () => {  
            console.log('server started');

            await exec('sleep 1'); // might not need this 

            for (const endpoint of endpoints) {
                try {
                    const curlCommand = `curl -s ${endpoint.method} localhost:${port}/api${endpoint.path}`; // added api here b/c my routes are at /api
                    console.log(curlCommand);
                    const { stdout, stderr } = await exec(curlCommand);
                    if (stdout) {
                        endpoint.response = stdout;
                    } else if (stderr) {
                        endpoint.response = stderr;
                    }
                } catch (e) {
                    endpoint.response = e as string;
                }
            }

            subprocess.kill(); 

            resolve(endpoints);

        })
        subprocess.on('error', (err) => {
            console.error('Failed to start subprocess.');
            reject(err)
        });
        subprocess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

    })
}
