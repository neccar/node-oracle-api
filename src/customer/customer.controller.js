import logger from '../config/winston';
import * as customerService from './customer.db.service';

export async function get(req, res, next) {
	try {
		const {customerid} = req.params;
		let result;

		if (customerid) {
			result = await customerService.getSingleCustomer(customerid);
		} else {
			result = await customerService.getAllCustomers();
		}

		res.status(200).json(result);
	} catch (err) {
		logger.error(err);
		next(err);
	}
}
