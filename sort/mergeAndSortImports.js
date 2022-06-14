import getImportStatementList from "../utils/getImportStatementList";
import getImportsFromStatement from "../utils/getImportsFromStatement";
import getPathFromStatement from "../utils/getPathFromStatement";
import logger from "../logger";
import sort from "../utils/sort";
import buildSortedImportStatement from "./buildSortedImportStatement";

let mergeImportStatementsAndSortImports = ({ previousStatement, statement }) => {
	let { defaultImport, namedImportList } = getImportsFromStatement(statement);
	let path = getPathFromStatement(statement);
	if (!previousStatement) {
		return buildSortedImportStatement({ defaultImport, namedImportList, path });
	}
	// get data from statements
	let { defaultImport: previousDefaultImport, namedImportList: previousNamedImportList } =
		getImportsFromStatement(previousStatement);
	// merge default import
	let mergedDefaultImport = previousDefaultImport || defaultImport;
	// merge named imports
	let mergedNamedImportList = [...(previousNamedImportList || []), ...(namedImportList || [])];
	if (mergedNamedImportList.length === 0) mergedNamedImportList = null;
	// construct merged statement;
	return buildSortedImportStatement({
		defaultImport: mergedDefaultImport,
		namedImportList: mergedNamedImportList,
		path,
	});
};

let mergeAndSortImports = (fileText) => {
	let statementList = getImportStatementList(fileText);
	if (statementList.length === 0) {
		logger.debug("No imports to sort");
		return;
	}
	let statementLookup = {};
	// use pathLookup and merge statements within the same path
	for (let statement of statementList) {
		let path = getPathFromStatement(statement);
		if (!statementLookup[path]) statementLookup[path] = [];
		statementLookup[path].push(statement);
		fileText = fileText.replace(statement, "");
	}
	let mergedStatementList = [];
	for (let path in statementLookup) {
		let statementList = statementLookup[path];
		let sortedMergedStatement;
		let i = 0;
		for (let statement of statementList) {
			let previousStatement = statementList[i - 1];
			sortedMergedStatement = mergeImportStatementsAndSortImports({ previousStatement, statement });
			i++;
		}
		mergedStatementList.push(sortedMergedStatement);
	}
	logger.debug("--- MERGED STATEMENT LIST ---");
	logger.debug(mergedStatementList);
	mergedStatementList = sort(mergedStatementList).map((x) => x.trim() + "\n");
	logger.debug("--- SORTED MERGED STATEMENT LIST ---");
	logger.debug(mergedStatementList);
	while (/\n\s*\n\s*\n/.test(fileText)) fileText = fileText.replace(/\n\s*\n\s*\n/, "\n\n"); // remove extra whitespace
	fileText = mergedStatementList.join("") + fileText;
	logger.debug("--- FILE TEXT WITH SORTED AND MERGED IMPORT STATEMENTS ---");
	logger.debug(fileText);
	return fileText;
};
export default mergeAndSortImports;
