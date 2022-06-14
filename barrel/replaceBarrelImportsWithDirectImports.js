import getImportStatementList from "../utils/getImportStatementList";
import createImportStatementList from "./createImportStatementList";
import logger from "../logger";
let replaceBarrelImportsWithDirectImports = ({ barrelImportPath, fileText, importLookup }) => {
	let replacePathList = [
		barrelImportPath,
		barrelImportPath.replace(".js", ""),
		barrelImportPath.replace("/index.js", ""),
	];
	logger.debug(`Replacing paths: ${replacePathList.join(", ")}`);
	let statementList = getImportStatementList(fileText);
	if (!statementList) return;
	if (statementList) {
		let replaceStatementList = statementList.filter((statement) =>
			replacePathList.some((replacePath) => statement.includes(`"${replacePath}"`))
		);
		logger.debug("--- REPLACE STATEMENT LIST ---");
		logger.debug(replaceStatementList);
		if (replaceStatementList.length === 0) return;
		let newImportStatementList = [];
		for (let statement of replaceStatementList) {
			let importStatementList = createImportStatementList({ statement, importLookup });
			fileText = fileText.replace(statement, "");
			newImportStatementList = [...newImportStatementList, ...importStatementList];
		}
		if (replaceStatementList.length > 0) {
			fileText = newImportStatementList.map((x) => x.trim() + "\n").join("") + fileText;
		}
	}
	logger.debug("HERE");
	return fileText;
};

export default replaceBarrelImportsWithDirectImports;
