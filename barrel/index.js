import createImportLookup from "./createImportLookup";
import args from "../args";
import iterateOverFiles from "../utils/iterateOverFiles";
import logger from "../logger";
import mergeAndSortImports from "../sort/mergeAndSortImports";
import replaceBarrelImportsWithDirectImports from "./replaceBarrelImportsWithDirectImports";
import transformFile from "../utils/transformFile";

// given a barrel file of imports and exports
// this script will refactor the entire application to remove imports from that file

let refactorBarrelImports = (skipWriteFlag) => {
	let { barrelFilePath, barrelImportPath, targetPath, extensionList } = args;
	logger.info("--- RUNNING REFACTOR BARREL FILE IMPORTS SCRIPT ---");
	logger.debug({ barrelFilePath, barrelImportPath, targetPath, extensionList });
	let importLookup = createImportLookup({ barrelFilePath, barrelImportPath });
	let refactorFile = ({ filePath }) => {
		logger.debug("--- REFACTORING FILE ---");
		logger.debug(filePath);
		let changeFileText = (fileText) => {
			let directImportsFileText = replaceBarrelImportsWithDirectImports({
				barrelImportPath,
				fileText,
				importLookup,
			});
			if (!directImportsFileText) logger.debug("Did NOT replace imports in this file");
			if (!directImportsFileText) return;
			let mergedImportsFileText = mergeAndSortImports(directImportsFileText);
			return mergedImportsFileText;
		};
		transformFile({ callback: changeFileText, filePath, skipWriteFlag });
	};
	let n = iterateOverFiles({ callback: refactorFile, path: targetPath, extensionList });
	logger.info(`Count: ${n} files.`);
	logger.info("--- REFACTOR BARREL FILE IMPORTS SCRIPT COMPLETED ---");
};

export default refactorBarrelImports;
