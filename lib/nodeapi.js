#!/usr/bin/env node
var argv = require("minimist")(process.argv.splice(2));
var open = require("open");
var fs = require("fs");
var path = require("path");
var utils = require("./utils");
var docsPath = path.join(__dirname, "../docs/node");

var tree = utils.split(argv._.join("-"))
var docs = fs.readdirSync(docsPath);
docs = docs.filter(function (d) {
	return d.indexOf(tree[0]) > -1;
});
var url = "https://nodejs.org/api/";
if (docs.length > 0) {
	var docName = docs[0].replace(".json", "");
	url += docName + ".html";
	var data = require(path.join(docsPath, docs[0]));
	if (tree[1]) {
		var foundMods = data.modules || data.globals;
		foundMods = foundMods[0].methods.concat(foundMods[0].properties, foundMods[0].events)
		.filter(function (m) {
			if (!m) return false;
			return m.name.toLowerCase().indexOf(tree[1].toLowerCase()) > -1;
		}).map(function (m) {
			return {
				hash: "#" + docName + "_" + utils.split(m.textRaw).join("_"),
				name: m.name
			};
		});
		if (foundMods.length > 0)
			url += foundMods[0].hash;

	}
} else {
	url += "index.html";
}
open(url);


// if (argv._[0])
// 	open("https://nodejs.org/api/" + argv._[0] + ".html");
// else
// 	open("https://nodejs.org/api/index.html");

