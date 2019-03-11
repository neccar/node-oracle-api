import oracledb from 'oracledb';
import {databasePool} from '../config/database';
import logger from '../config/winston';

export async function initializeDatabase() {
	await oracledb.createPool(databasePool());
}

export async function closeDatabase() {
	await oracledb.getPool().close();
}

export async function simpleExecute(statement, binds = [], options = {}) {
	let connection;
	options.outFormat = oracledb.OBJECT;
	options.autoCommit = true;

	try {
		connection = await oracledb.getConnection();
		const result = await connection.execute(statement, binds, options);

		return result;
	} finally {
		if (connection) {
			// Connection assignment worked, need to close
			try {
				await connection.close();
			} catch (e) {
				logger.error(e);
			}
		}
	}
}
