let fs = require("fs");

let getDirectories = (path) => {
	return fs
		.readdirSync(path, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
};

module.exports = getDirectories;
