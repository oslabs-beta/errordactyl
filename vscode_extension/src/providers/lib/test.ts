import { endpoint, methodType } from '../../../types';
import { window, workspace, Uri } from 'vscode';
const { spawn, spawnSync, execSync } = require('node:child_process');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

export const test = async (endpoints: endpoint[], port: string, directory: string) => {
    return new Promise((resolve, reject) => {
      let pathToWorkspace: string = '';
      if (workspace.workspaceFolders) {
        pathToWorkspace = workspace.workspaceFolders[0].uri.fsPath;
      }
      console.log(pathToWorkspace);
        const subprocess = spawn('npm', ['start'], {
            cwd: pathToWorkspace,
            detached: true 
        });
        subprocess.on('spawn', async () => {  
            console.log('server started');

            await exec('sleep 2'); // might not need this 

            for (const endpoint of endpoints) {
                try {
                    const curlCommand = `curl -s ${endpoint.method} localhost:${port}/books${endpoint.path}`; // added api here b/c my routes are at /api
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
            console.log("almost dead");
            // subprocess.kill(); 

            resolve(endpoints);

        })
        subprocess.on('error', (err: Error) => {
            console.error('Failed to start subprocess.');
            reject(err)
        });
        subprocess.stdout.on('data', (data: ArrayBuffer) => {
            console.log(data.toString());
        });
        subprocess.on('close', () => {
            console.log("subprocess closed");
        })

    })
}

// sync attempt
export const runRoutes = async (endpoints: endpoint[], port: string) => {
  let directory = '';
  if (workspace.workspaceFolders) {
    directory = workspace.workspaceFolders[0].uri.path;
  }
  // generate script string
  const startServer = 'npm start &';
  const sleep = 1;
  // start server and listen to stream
  const serverProcess = spawnSync(`cd ${directory} &&` + startServer + `sleep ${sleep}`);
  // when server process is closed, log endpoints
  serverProcess.on('close', () => {
      console.log('server closed:', endpoints);
  })

  // iterate over endpoints and store responses from stdout
  for (const endpoint of endpoints) {
      // send request
      const response = execSync(`curl -s ${endpoint.method} localhost:${port}${endpoint.path}`);
      endpoint.response = response;
  }

  // access pid with port and close server
  execSync(`lsof i :${port} | xargs kill -9`, () => {
    console.log('kill server')
  });
  return endpoints;
}