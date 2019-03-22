import logger from "../config/winston";
import * as customerService from "./customer.db.service";

export async function get(req, res, next) {
  try {
    const { id } = req.params;
    let result;

    if (id) {
      result = await customerService.getSingleCustomer(id);
    } else {
      result = await customerService.getAllCustomers();
    }

    if (!result) {
      res.status(404).json("customer not found");
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export async function post(req, res, next) {
  try {
    let customer = {
      name: req.body.name,
      surname: req.body.surname,
      email_address: req.body.email_address
    };

    customer = await customerService.create(customer);

    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
}

export async function put(req, res, next) {
  try {
    let customer = {
      id: parseInt(req.body.id, 10),
      name: req.body.name,
      surname: req.body.surname,
      email_address: req.body.email_address
    };

    customer = await customerService.update(customer);

    if (customer !== null) {
      res.status(200).json(customer);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function del(req, res, next) {
  try {    
    const id = parseInt(req.params.id, 10);
	  console.log('req.params', id)

    const success = await customerService.del(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
