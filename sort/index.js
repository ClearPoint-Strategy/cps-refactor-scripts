import args from "../args";
import iterateOverFiles from "../utils/iterateOverFiles";
import logger from "../logger";
import mergeAndSortImports from "./mergeAndSortImports";
import transformFile from "../utils/transformFile";

let sortImports = (skipWriteFlag) => {
	let { targetPath, extensionList } = args;
	logger.info("--- RUNNING SORT IMPORTS SCRIPT ---");
	logger.debug({ targetPath, extensionList });
	let refactorFile = ({ filePath }) => {
		logger.debug("--- REFACTORING FILE ---");
		logger.debug(filePath);
		transformFile({ callback: mergeAndSortImports, filePath, skipWriteFlag });
	};
	let n = iterateOverFiles({ callback: refactorFile, path: targetPath, extensionList });
	logger.info(`Count: ${n} files.`);
	logger.info("--- REFACTOR BARREL FILE IMPORTS SCRIPT COMPLETED ---");
};

export default sortImports;
