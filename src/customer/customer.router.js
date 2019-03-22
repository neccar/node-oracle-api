import express from 'express';
import * as customerController from './customer.controller';

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/:id?').get(customerController.get).post(customerController.post).put(customerController.put).delete(customerController.del);

export default router;
