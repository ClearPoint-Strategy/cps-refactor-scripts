import barrel from "./barrel";
import sort from "./sort";
import args from "./args";
import { setConsoleTransportLevel } from "./logger";

(async () => {
	let scriptLookup = {
		barrel,
		sort,
	};
	let { debugFlag, script } = args;
	if (debugFlag) setConsoleTransportLevel("debug");
	await scriptLookup[script](debugFlag);
})();
