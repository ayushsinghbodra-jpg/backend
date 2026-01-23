// Core Module
const path = require('path');

//require.main  refers to the main module 
//.filiename refers to the full path to theat main module  
//this is a node property that returns the absolute path of the entry point module.
module.exports = path.dirname(require.main.filename);
