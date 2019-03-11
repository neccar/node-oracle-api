import {startup, shutdown} from './bootstrap';
import {databasePool} from './config/database';
import logger from './config/winston';

const defaultThreadPoolSize = 4;
// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = databasePool.poolMax + defaultThreadPoolSize;

startup();

process.on('SIGTERM', () => {
	logger.info('Received SIGTERM');

	shutdown();
});

process.on('SIGINT', () => {
	logger.info('Received SIGINT');

	shutdown();
	process.exit();
});

process.on('uncaughtException', err => {
	logger.error('Uncaught exception', err);
	shutdown(err);
});
