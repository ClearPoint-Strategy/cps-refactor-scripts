import { readdirSync } from "fs";
import { extname, join } from "path";
import args from "../args";
import logger from "../logger";
import getDirectories from "./getDirectories";

let n = 0;
let loggedFlag = false;
let iterateOverFilesOfType = ({ callback, path, extensionList }) => {
	let { fileCount, fileMatch } = args;
	if (!loggedFlag) {
		if (fileCount) logger.info(`Running on first ${fileCount} files.`);
		if (fileMatch) logger.info(`Running on files that match text: ${fileMatch}.`);
		loggedFlag = true;
	}
	let filePathList = readdirSync(path);
	filePathList = filePathList.filter((x) => extensionList.includes(extname(x)));
	for (let filePath of filePathList) {
		let fullFilePath = join(path, filePath);
		let fileMatchFlag = !fileMatch || new RegExp(fileMatch).test(fullFilePath);
		let countFlag = !fileCount || n < fileCount;
		if (fileMatchFlag && countFlag) {
			callback({ filePath: fullFilePath });
			n++;
		}
	}
	let directoryList = getDirectories(path);
	for (let directory of directoryList) {
		iterateOverFilesOfType({ callback, path: join(path, directory), extensionList });
	}
	return n;
};

export default iterateOverFilesOfType;
