/* eslint-disable no-console */
const yargs = require('yargs');
const config = require('./config');


/**
 * variable with the value of the default json file
 * @type {string}
 */
// const jsonFile = 'default.json';
/**
 * variable with the value of the schema json file
 * @type {string}
 */
const schemaFile = 'schema.json';

function getArguments() {
  const argv = yargs.usage('Usage: $0 [options]')
    .alias('c', 'config')
    .default('c', 'default.json')
    .describe('c', 'The config file.')
    .nargs('c', 1)
    .alias('h', 'help')
    .version(false)
    .argv;

  console.log('my config file', argv.config);
  return argv;
}

async function main() {
  const options = getArguments();
  try {
    // eslint-disable-next-line no-unused-vars
    const myConfiguration = await config.readAndParseConfig(options.config, schemaFile);
  } catch (err) {
    console.log('There is an error with the configuration file');
  }
  // let myVerification = config.verifyConfig(file);
}
main();
