import assert from 'node:assert';
import { after, before, beforeEach, describe, it } from 'node:test';
import createTestApp from './fixture/create-test-app.ts';

describe('Express 4', () => {
	let app: Awaited<ReturnType<typeof createTestApp>>;

	before(async () => {
		app = await createTestApp('express4');
	});

	after(() => {
		app.stop();
	});

	describe('GET /404-no-message', () => {
		let response: Response;

		beforeEach(async () => {
			response = await app.get('/404-no-message');
		});

		it('responds with a 404 status', () => {
			assert.strictEqual(response.status, 404);
		});

		it('responds with the expected message', async () => {
			const body = await response.text();
			assert.ok(body.includes('NotFoundError: Not Found'));
		});
	});

	describe('GET /404-with-message', () => {
		let response: Response;

		beforeEach(async () => {
			response = await app.get('/404-with-message');
		});

		it('responds with a 404 status', () => {
			assert.strictEqual(response.status, 404);
		});

		it('responds with the expected message', async () => {
			const body = await response.text();
			assert.ok(body.includes('NotFoundError: Nope'));
		});
	});
});
