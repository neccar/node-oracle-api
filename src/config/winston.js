import * as winston from 'winston';
// eslint-disable-next-line no-unused-vars
import {DailyRotateFileTransportOptions} from 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
	filename: './logs/pres-monitor-api-%DATE%.log',
	datePattern: 'YYYY-MM-DD-HH',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '5d'
});

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.errors({stack: true}),
		winston.format.splat(),
		winston.format.json()
	),
	transports: [transport]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			)
		})
	);
}

export default logger;
