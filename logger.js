import winston from "winston";
let { format } = winston;
let { colorize, combine, json, printf, simple, splat } = format;

let jsonLog = (log) => {
	if (typeof log.message === "object") log.message = JSON.stringify(log.message, 0, 3);
};

let logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: "info",
			format: combine(printf(jsonLog), colorize(), simple()),
		}),
	],
});

let setConsoleTransportLevel = (level) => (logger.transports[0].level = level);

export default logger;

export { setConsoleTransportLevel };
