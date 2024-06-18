'use strict';

const path = require('node:path');
const notFound = require('../../..');

module.exports = async function createTestApp(expressModule) {
	const express = require(expressModule);

	// Create an Express app
	const app = express();
	app.set('view engine', 'hbs');
	app.set('views', path.join(__dirname, 'view'));

	// Add not found handlers
	app.use('/404-no-message', notFound());
	app.use('/404-with-message', notFound({ message: 'Nope' }));

	// Start the server and get the application address
	const server = await start(app);
	const address = `http://localhost:${server.address().port}`;

	/**
	 * Stop the application.
	 */
	function stop() {
		server.close();
	}

	/**
	 * Method to make a GET request to the test application.
	 *
	 * @param {string} requestPath
	 *     The path to make a request to.
	 * @returns {Promise<{status: number, body: string}>}
	 *     Returns an HTTP response object.
	 */
	async function get(requestPath) {
		const url = new URL(requestPath, address);
		const response = await fetch(url);
		return {
			status: response.status,
			body: await response.text()
		};
	}

	// Return the two methods that we need
	return {
		get,
		stop
	};
};

/**
 * Start the application.
 *
 * @param {import('express').Application} app
 *     The Express application to start.
 * @returns {Promise<import('http').Server>}
 *     Returns the started HTTP server.
 */
function start(app) {
	return new Promise((resolve, reject) => {
		const server = app.listen(undefined, (error) => {
			if (error) {
				return reject(error);
			}
			resolve(server);
		});
	});
}
