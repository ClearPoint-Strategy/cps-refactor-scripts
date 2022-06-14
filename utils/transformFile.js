import { readFileSync, writeFileSync } from "fs";
let transformFile = ({ callback, filePath, skipWriteFlag }) => {
	let fileText = readFileSync(filePath, { encoding: "utf-8" });
	fileText = callback(fileText);
	if (!skipWriteFlag && fileText !== undefined) writeFileSync(filePath, fileText);
};
export default transformFile;
