import {EventEmitter} from 'events';
import * as httpMocks from 'node-mocks-http';
import * as customerService from './customer.db.service';
import {get} from './customer.controller';

const customerDetail = {
	customer_NAME: 'BSS customerS REAL NAME',
	EMAIL_ADDRESS: 'BSScustomerSEMAIL@SKY.UK'
};

const customerGroupInfo = [
	{
		customer_CODE: 'BSScustomerCODE',
		SECURITY_GROUP_CODE: 'PLANDOWN'
	},
	{
		customer_CODE: 'BSScustomerCODE',
		SECURITY_GROUP_CODE: 'PRESDOWN'
	}
];

jest.mock('./customer.db.service');

describe('get', () => {
	const apiResult =
    '{"customername":"BSScustomerCODE","name":"BSS customerS REAL NAME","email":"BSScustomerSEMAIL@SKY.UK","hasPlanningDownloadRight":true,"hasPresentationDownloadRight":true}';
	let req;
	let res;
	beforeEach(() => {
		req = httpMocks.createRequest({
			method: 'GET',
			params: {customername: 'BSScustomerCODE'},
			url: 'api/customers/BSScustomerCODE'
		});

		res = httpMocks.createResponse({eventEmitter: EventEmitter});

		customerService.getcustomerDetail.mockResolvedValue(customerDetail);
		customerService.getcustomerGroupInfo.mockResolvedValue(customerGroupInfo);
	});

	test('should return customer data as json', async () => {
		res.on('end', () => {
			expect(res._getData()).toBe(apiResult);
		});

		await get(req, res, () => {});
		expect(customerService.getcustomerDetail).toBeCalled();
		expect(customerService.getcustomerGroupInfo).toBeCalled();
	});

	test('when customer doesnt exits should return 404', async () => {
		req = httpMocks.createRequest({
			method: 'GET',
			params: {customername: 'BSSNONEXISTINGcustomerCODE'},
			url: 'api/customers/BSSNONEXISTINGcustomerCODE'
		});
		customerService.getcustomerDetail.mockResolvedValue(null);

		res.on('end', () => {
			expect(res._getData()).toBe('customer not found');
			expect(res.statusCode).toBe(404);
		});

		await get(req, res, () => {});

		expect(customerService.getcustomerDetail).toBeCalled();
		expect(customerService.getcustomerGroupInfo).toBeCalled();
	});
});
