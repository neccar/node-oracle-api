import {EventEmitter} from 'events';
import * as httpMocks from 'node-mocks-http';
import * as customerService from './customer.db.service';
import {get} from './customer.controller';

const customer = {
  ID: '1',
  NAME: 'John',
  SURNAME: 'Smith',
  EMAIL_ADDRESS: 'johnsmith@gmail.com'
};

jest.mock('./customer.db.service');

describe('get', () => {
  const apiResult =
    '{"ID":"1","NAME":"John","SURNAME":"Smith","EMAIL_ADDRESS":"johnsmith@gmail.com"}';
  let req;
  let res;
  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'GET',
      params: {id: 1},
      url: 'api/customers/id'
    });

    res = httpMocks.createResponse({eventEmitter: EventEmitter});

    customerService.getSingleCustomer.mockResolvedValue(customer);
  });

  test('should return customer data as json', async () => {
    res.on('end', () => {
      expect(res._getData()).toBe(apiResult);
    });

    await get(req, res, () => {});
    expect(customerService.getSingleCustomer).toBeCalled();
  });

  test('when customer doesnt exist should return 404', async () => {
    req = httpMocks.createRequest({
      method: 'GET',
      params: {id: 99},
      url: 'api/customers/id'
    });
    customerService.getSingleCustomer.mockResolvedValue(null);

    res.on('end', () => {
      expect(res.statusCode).toBe(404);
      expect(res._getData()).toMatch('customer not found');
    });

    await get(req, res, () => {});

    expect(customerService.getSingleCustomer).toBeCalled();
  });
});
