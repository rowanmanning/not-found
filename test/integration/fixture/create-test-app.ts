import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import type { Application, Express } from 'express';
import { notFound } from '../../../index.ts';

export default async function createTestApp(expressModule: 'express4' | 'express5') {
	const { default: express } = await import(expressModule);

	// Create an Express app
	const app = express() as Express;

	// Add not found handlers
	app.use('/404-no-message', notFound());
	app.use('/404-with-message', notFound({ message: 'Nope' }));

	const server = await start(app);
	const { port } = server.address() as AddressInfo;
	const address = `http://localhost:${port}`;

	/**
	 * Stop the application.
	 */
	function stop() {
		server.close();
	}

	/**
	 * Method to make a request to the test application.
	 */
	function makeAppRequest(method: string, requestPath: string) {
		const url = new URL(requestPath, address);
		return fetch(url, { method });
	}

	/**
	 * Method to make a GET request to the test application.
	 */
	function get(requestPath: string) {
		return makeAppRequest('GET', requestPath);
	}

	return {
		get,
		stop
	};
}

/**
 * Start the application
 */
function start(app: Application): Promise<Server> {
	return new Promise((resolve) => {
		const server = app.listen(() => {
			resolve(server);
		});
	});
}
