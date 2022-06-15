let removeComments = (string) =>
	string
		.split("\n")
		.filter((x) => !x.trim().startsWith("//"))
		.join("\n");
export default removeComments;
