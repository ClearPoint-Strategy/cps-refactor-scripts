import yargs from "yargs";
import { hideBin } from "yargs/helpers";

let args = yargs(hideBin(process.argv))
	.option("script", {
		alias: "s",
		choices: ["barrel", "sort"],
		demandOption: true,
		description: "Name of script to run",
		type: "string",
	})
	.option("debug-flag", {
		alias: "d",
		description: "Enable debug mode: No file changes, logging enabled",
		type: "boolean",
		default: false,
	})
	.option("debug-file-count", {
		alias: "c",
		description: "Number of files to use for debugging",
		type: "number",
	})
	.option("file-match", {
		alias: "m",
		description: "File name matcher",
		type: "number",
	})
	.option("target-path", {
		alias: "p",
		demandOption: true,
		description: "The path to files to be refactored",
		type: "string",
	})
	.option("extension-list", {
		alias: "e",
		demandOption: true,
		description: "The extension for files to be refactored",
		type: "array",
	})
	.option("barrel-import-path", {
		alias: "i",
		description: "For barrel script: the import path for the barrel",
		type: "string",
	})
	.option("barrel-file-path", {
		alias: "b",
		description: "For barrel script: the barrel file to refactor imports from",
		type: "string",
	}).argv;

export default args;
