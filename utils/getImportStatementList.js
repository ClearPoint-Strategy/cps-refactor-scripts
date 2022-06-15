import logger from "../logger";

let getImportStatementList = (fileText) => {
	let firstStatement = fileText.match(/^import.+?".+?";?/);
	let statementList = fileText.match(/(?<=\n)import[\s\S]+?".+?";?/g);
	logger.debug("--- IMPORT STATEMENT LIST ---");
	logger.debug([...(firstStatement || []), ...(statementList || [])]);
	return [...(firstStatement || []), ...(statementList || [])];
};
export default getImportStatementList;
