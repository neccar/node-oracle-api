import express from 'express';
import * as customerController from './customer.controller';

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/:customerid?').get(customerController.get);

export default router;
