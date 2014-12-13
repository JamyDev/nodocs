var request = require("request");
var path = require("path");
var fs = require("fs");
var utils = require("./utils");
// Download node docs
var docsPath = path.join(__dirname, "../docs/");
try {
	fs.mkdirSync(path.join(docsPath, "node"))
} catch (e) {}
request("https://nodejs.org/api/index.json", function (err, data) {
	if (err) {
		console.error(err);
		return;
	}
	var node_docs = JSON.parse(data.body);
	docList = [];
	node_docs.desc.forEach(function (d) {
		if (d.type === "text") {
			
			docList.push(utils.split(d.text.substr(d.text.indexOf("(")))[0]);
		}
	});

	docList.forEach(function (d) {
		request("https://nodejs.org/api/"+d+".json").pipe(fs.createWriteStream(path.join(docsPath, "node", d + ".json")));
	});

	console.log(docList)
})