// Setting up request library

const request = require('request');
const fs = require('fs');
const process = require('process');

// Error message output if command line input us not exactly 4 items
if (process.argv.length !== 4) {
  console.log('In order to use specify the following: node fetcher.js <URL> <localFilePath>');
  process.exit(1);
}

// Establishing teh file path
const sourceURL = process.argv[2];
const localFilePath = process.argv[3];

request(sourceURL, (error, response, body) => {
  if (error) {
    console.error(`Error downloading the resource: ${error}`);
    process.exit(1);
  }

  // Specify what kind of error message
  if (response.statusCode < 200 || response.statusCode >= 300) {
    console.error(`HTTP Error: ${response.statusCode}`);
    process.exit(1);
  }

  fs.writeFile(localFilePath, body, (writeError) => {
    if (writeError) {
      console.error(`Error writing the file: ${writeError}`);
      process.exit(1);
    }

    console.log(`Downloaded and saved ${Buffer.byteLength(body)} bytes to ${localFilePath}`);
  });
});


// EXample code in command line
// node fetcher.js http://www.example.edu/ ./index.html
