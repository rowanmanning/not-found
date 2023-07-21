'use strict';

const assert = require('node:assert');
const createTestApp = require('./fixture/create-test-app');

describe('Express 4', () => {
	let app;

	before(async () => {
		app = await createTestApp('express4');
	});

	after(() => {
		app.stop();
	});

	describe('GET /404-no-message', () => {
		let response;

		beforeEach(async () => {
			response = await app.get('/404-no-message');
		});

		it('responds with a 404 status', () => {
			assert.strictEqual(response.status, 404);
		});

		it('responds with the expected message', () => {
			assert.ok(response.data.includes('NotFoundError: Not Found'));
		});

	});

	describe('GET /404-with-message', () => {
		let response;

		beforeEach(async () => {
			response = await app.get('/404-with-message');
		});

		it('responds with a 404 status', () => {
			assert.strictEqual(response.status, 404);
		});

		it('responds with the expected message', () => {
			assert.ok(response.data.includes('NotFoundError: Nope'));
		});

	});

});
