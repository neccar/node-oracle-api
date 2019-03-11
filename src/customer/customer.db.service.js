import {simpleExecute} from '../bootstrap/database';

export async function getSingleCustomer(customerId) {
	const query = `Select * from CUSTOMER c where c.ID = :customerId`;

	const binds = {
		customerId
	};

	const result = await simpleExecute(query, binds);
	if (result.rows.length > 0) {
		return result.rows[0];
	}
	return null;
}

export async function getAllCustomers() {
	const query = `Select * from CUSTOMER`;

	const result = await simpleExecute(query);

	if (result.rows.length > 0) {
		return result.rows;
	}

	return null;
}
