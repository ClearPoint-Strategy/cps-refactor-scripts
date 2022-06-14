let getPathFromStatement = (statement) => statement.match(/"(.+)"/)[1];
export default getPathFromStatement;
