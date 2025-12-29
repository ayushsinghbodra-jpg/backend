// Core Module
const path = require('path');

//we are using require.main.filename to get the entry point of the application and then using path.dirname to get the directory name of that file which will be the root directory of the project
module.exports = path.dirname(require.main.filename);