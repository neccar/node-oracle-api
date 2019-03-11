export function databasePool() {
	return {
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		connectString: process.env.DB_CONNECTIONSTRING,
		poolMin: 1,
		poolMax: 4,
		poolIncrement: 1
	};
}
