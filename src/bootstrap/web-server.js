import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import customerRouter from '../customer/customer.router';

let httpServer;

export async function initializeWebServer() {
	const app = express();
	httpServer = http.createServer(app);

	// Combines logging info from request and response
	app.use(morgan('combined'));
	app.use(cors());

	// Parse incoming JSON requests and revive JSON.
	app.use(
		express.json({
			reviver: reviveJson
		})
	);

	// Mount the router at /api so all its routes start with /api
	app.use('/api/customers', customerRouter);

	httpServer.listen(process.env.API_PORT, error => {
		if (error) {
			throw error;
		}

		console.log(`Web server listening on localhost:${process.env.API_PORT}`);
	});
}

export async function closeWebServer() {
	await httpServer.close();
}

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
	// Revive ISO 8601 date strings to instances of Date
	if (typeof value === 'string' && iso8601RegExp.test(value)) {
		return new Date(value);
	}
	return value;
}
