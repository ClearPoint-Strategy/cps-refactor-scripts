let capitalizedUtilList = ["PropTypes"];
let importLastList = ["theme", '"'];

let isCapitalizedUtil = (x) => capitalizedUtilList.some((y) => x.startsWith(y));
let isComponent = (x) => /[A-Z]/.test(x[0]) && !isCapitalizedUtil(x);
let isHook = (x) => x.startsWith("use");
let isLastImport = (x) => importLastList.some((y) => x.startsWith(y));
let isOther = (x) => !isLastImport(x);

let orderedConditionList = [isComponent, isHook, isCapitalizedUtil, isOther, isLastImport];

let stripImportStatement = (x) => (x.startsWith("import ") ? x.replace("import", "").replace("{", "").trim() : x);

let sort = (list) =>
	list.sort((a, b) => {
		a = stripImportStatement(a);
		b = stripImportStatement(b);
		for (let condition of orderedConditionList) {
			if (condition(a) && !condition(b)) return -1;
			if (condition(b) && !condition(a)) return 1;
			if (condition(a) && condition(b)) return a < b ? -1 : a > b ? 1 : 0;
		}
		return 0;
	});
export default sort;
