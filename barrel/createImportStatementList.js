import getImportsFromStatement from "../utils/getImportsFromStatement";
import buildSortedImportStatement from "../sort/buildSortedImportStatement";

let createImportStatementList = ({ statement, importLookup }) => {
	let { namedImportList } = getImportsFromStatement(statement);
	let pathLookup = {};
	for (let _import of namedImportList) {
		let importData = importLookup[_import];
		if (!importData) throw new Error(`No import data for ${_import}`);
		let { path, type: importType, alias } = importData;
		let importName = alias || _import;
		if (!pathLookup[path]) pathLookup[path] = {};
		let pathImport = pathLookup[path];
		if (importType === "default") {
			pathImport.defaultImport = importName;
		}
		if (importType === "named") {
			if (!pathImport.namedImportList) pathImport.namedImportList = [];
			pathImport.namedImportList.push(importName);
		}
	}
	let importStatementList = [];
	for (let path in pathLookup) {
		let { defaultImport, namedImportList } = pathLookup[path];
		let importStatement = buildSortedImportStatement({ defaultImport, namedImportList, path });
		importStatementList.push(importStatement);
	}
	return importStatementList;
};
export default createImportStatementList;
