let getImportsFromStatement = (statement) => {
	let importMatch = statement.match(/import ([\s\S]+?) from/);
	if (!importMatch) return {};
	let importString = importMatch[1];
	let defaultImport, namedImportList;
	if (!importString.startsWith("{")) {
		defaultImport = importString.split(",")[0];
	}
	if (importString.includes("{")) {
		let startIndex = importString.indexOf("{");
		let endIndex = importString.indexOf("}");
		let namedImportString = importString.slice(startIndex + 1, endIndex);
		namedImportList = namedImportString
			.split(",")
			.map((x) => x.trim())
			.filter((x) => !!x);
	}
	return {
		defaultImport,
		namedImportList,
	};
};
export default getImportsFromStatement;
