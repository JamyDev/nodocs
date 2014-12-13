#!/usr/bin/env node
var argv = require("minimist")(process.argv.splice(2));
var open = require("open");

open("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/" + args._[0])