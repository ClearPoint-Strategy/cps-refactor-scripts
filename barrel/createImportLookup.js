import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { LOG_PATH } from "./config";
import getImportStatementList from "../utils/getImportStatementList";
import getImportsFromStatement from "../utils/getImportsFromStatement";
import getPathFromStatement from "../utils/getPathFromStatement";
import { resolve } from "path";
import logger from "../logger";

let createImportLookup = ({ barrelFilePath, barrelImportPath }) => {
	logger.debug(resolve(barrelFilePath));
	let fileText = readFileSync(resolve(barrelFilePath), { encoding: "utf-8" });
	let statementList = getImportStatementList(fileText);
	let lookup = {};
	let directory = barrelImportPath.match(/.+\//)[0];
	for (let statement of statementList) {
		let { defaultImport, namedImportList } = getImportsFromStatement(statement);
		let path = getPathFromStatement(statement).replace(/^\.\//g, directory);
		if (path.startsWith(".")) throw new Error("All imports must be absolute. Please update path: " + path);
		if (defaultImport) {
			lookup[defaultImport] = {
				path,
				type: "default",
			};
		}
		if (namedImportList) {
			for (let namedImport of namedImportList) {
				let namedImportWordList = namedImport.split(" ");
				let length = namedImportWordList.length;
				let alias;
				if (length > 1) {
					alias = namedImport;
					namedImport = namedImportWordList[length - 1];
				}
				lookup[namedImport] = {
					path,
					type: "named",
					alias,
				};
			}
		}
	}
	mkdirSync(LOG_PATH, { recursive: true });
	writeFileSync(`${LOG_PATH}/importLookup.json`, JSON.stringify(lookup, null, 3), {
		recursive: true,
	});
	return lookup;
};

export default createImportLookup;
