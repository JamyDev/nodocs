var argv = require("minimist")(process.argv.splice(2));
var open = require("open");

open("https://nodejs.org/api/" + argv._[0] + ".html");