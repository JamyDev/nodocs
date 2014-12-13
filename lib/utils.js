module.exports.split = function (string) {
	var array = [];
	var isPrevTeken = false;
	var next = "";
	for (var i = 0; i < string.length; i++) {
		if (string.charAt(i).match(/[a-zA-Z]+/)) {
			next += string.charAt(i);
			isPrevTeken = false;
		} else {
			if (!isPrevTeken && next !== "") {
				array.push(next);
				next = "";
			} else {
				isPrevTeken = true;
			}
		}
	}
	if (next !== "")
		array.push(next);
	return array;
}