export async function init() {
  // store user input for config file
  let path: string | null = './server/routes';
  let files: string[] | undefined = [];
  let pathToServer: string | null = './server/server.ts';

  const useDefaultServerPath = confirm('Do you want to use the default server file location of ./server/server.ts?');

  if (!useDefaultServerPath) {
    pathToServer = prompt('Please enter the path to your server file:');
  }

  const useDefaultRouteLocation = confirm('Do you want to use the default route location of ./server/routes?');
  // if y then continue to next questions

  // else ask user to input routes
  if (!useDefaultRouteLocation) {
    path = prompt('Please enter the directory path where your routes are stored:');
    // const confirmation = confirm('Route directory path: ' + path);
    // if (!confirmation)
  }

  const testAllFiles = confirm('Do you want to test all routes found in this directory?');

  if (!testAllFiles) {
      const userInput = prompt('Please enter all relative file paths that you would like to test (separated by spaces):');
      files = userInput?.split(' ');
  }

  const config = {
    serverPath: pathToServer,
    routesPath: path,
    filePaths: files,
  }

  await Deno.mkdir('./_errordactyl');

  await Deno.writeTextFile('./_errordactyl/config.json', JSON.stringify(config));
  console.log('Successfully generated initial config in ./_errordactyl/config.json')
}