import sort from "../utils/sort";

let buildSortedImportStatement = ({ defaultImport, namedImportList, path }) => {
	if (!defaultImport && !namedImportList) return `import "${path}"`;
	if (namedImportList) namedImportList = sort(namedImportList);
	let statement = "import ";
	if (defaultImport) statement += defaultImport;
	if (defaultImport && namedImportList) statement += ", ";
	if (namedImportList) statement += `{ ${namedImportList.join(", ")} }`;
	return (statement += ` from "${path}";\n`);
};

export default buildSortedImportStatement;
