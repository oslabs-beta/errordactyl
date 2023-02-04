const fs = require('fs/promises');
const readline = require('readline/promises');
const rl = readline.createInterface(process.stdin, process.stdout);

export async function init() {
  // store user input for config file
  let path: string | null = './server/routes';
  let files: string[] | undefined = [];
  let pathToServer: string | null = './server/server.js';

  const useDefaultServerPath = await rl.question('Do you want to use the default server file location of ./server/server.js?');

  if (!useDefaultServerPath) {
    pathToServer = await rl.question('Please enter the path to your server file:');
  }

  const useDefaultRouteLocation = await rl.question('Do you want to use the default route location of ./server/routes?');
  // if y then continue to next questions

  // else ask user to input routes
  if (!useDefaultRouteLocation) {
    path = rl.question('Please enter the directory path where your routes are stored:');
    // const confirmation = confirm('Route directory path: ' + path);
    // if (!confirmation)
  }

  const testAllFiles = await rl.question('Do you want to test all routes found in this directory?');

  if (!testAllFiles) {
      const userInput = await rl.question('Please enter all relative file paths that you would like to test (separated by spaces):');
      files = userInput?.split(' ');
  }

  const config = {
    serverPath: pathToServer,
    routesPath: path,
    filePaths: files,
  }

  await fs.mkdir('./_errordactyl'); // fs.mkdir?

  await fs.writeFile('./_errordactyl/config.json', JSON.stringify(config)); // fs.writeFile
  await rl.close();
  console.log('Successfully generated initial config in ./_errordactyl/config.json')
}