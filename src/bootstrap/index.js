import dotenv from 'dotenv';
import logger from '../config/winston';
import {initializeWebServer, closeWebServer} from './web-server';
import {initializeDatabase, closeDatabase} from './database';

export async function startup() {
	const nodeEnv = process.env.NODE_ENV || 'development';
	if (nodeEnv === 'development') {
		await dotenv.config({path: `.env.development`});
	}

	logger.info('Starting application');

	try {
		logger.info('Initializing database module');
		await initializeDatabase();

		logger.info('Initializing web server module');
		await initializeWebServer();
	} catch (error) {
		console.error(error);
		process.exit(1); // Non-zero failure code
	}
}

export async function shutdown(e) {
	let error = e;

	logger.info('Shutting down application');

	try {
		logger.info('Closing web server module');

		await closeWebServer();
	} catch (e) {
		logger.error(e);
		error = error || e;
	}

	try {
		logger.info('Closing database module');

		await closeDatabase();
	} catch (e) {
		logger.error(e);
		error = error || e;
	}

	if (error) {
		logger.info('Exiting process with error', error);
		process.exit(1); // Non-zero failure code
	} else {
		logger.info('Exiting process without error');
		process.exit(0);
	}
}
