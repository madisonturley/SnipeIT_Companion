/* eslint-disable no-console */
const fse = require('fs-extra');
// eslint-disable-next-line no-unused-vars
const axios = require('axios');
const Ajv = require('ajv');

// TODO verify connections
// TODO return

/**
 * readAndParseConfig reads the file, parses it, and then validates that it
 * is in the correct format and has the correct values.
 * @param {string} jsonFile the path to the json file
 * @param schemaFile
 * @returns {Promise<void>} a promise resolving to a config object
 */
async function readAndParseConfig(jsonFile, schemaFile) {
  console.log('Reading and parsing json file');
  const json = await fse.readJson(jsonFile).catch((err) => {
    console.log(err);
    throw new Error('Error reading json file');
  });

  const schema = await fse.readJson(schemaFile).catch((err) => {
    console.log(err);
    throw new Error('Error reading schema file');
  });

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(json);
  if (!valid) {
    console.log(validate.errors);
    throw new Error('Error validating json file');
  }
}

// async function verifyConfig(filepath){
//     console.log('Check that file exists');x
//     await fse.ensureFile(filepath).catch((err)=>{
//         console.log('File does not exist', err);
//     })
//
// }

module.exports = {
  readAndParseConfig,
  // verifyConfig: verifyConfig
};
