'use strict';

const { afterEach, beforeEach, describe, it } = require('node:test');
const assert = require('node:assert');
const td = require('testdouble');

td.config({ ignoreWarnings: true });

describe('not-found', () => {
	let notFound;

	beforeEach(() => {
		notFound = require('../..');
	});

	afterEach(() => td.reset());

	describe('notFound()', () => {
		let middleware;

		beforeEach(() => {
			middleware = notFound();
		});

		it('returns a middleware function', () => {
			assert.strictEqual(typeof middleware, 'function');
		});

		describe('middleware(request, response, next)', () => {
			let nextFn;
			let returnValue;

			beforeEach(() => {
				nextFn = td.func();
				returnValue = middleware({}, {}, nextFn);
			});

			it('calls `next` with a 404 error', () => {
				td.verify(nextFn(), {
					ignoreExtraArgs: true,
					times: 1
				});
				const error = td.explain(nextFn).calls[0].args[0];
				assert.ok(error instanceof Error);
				assert.strictEqual(error.status, 404);
				assert.strictEqual(error.statusCode, 404);
				assert.strictEqual(error.message, 'Not Found');
			});

			it('returns nothing', () => {
				assert.strictEqual(returnValue, undefined);
			});
		});
	});

	describe('notFound(options)', () => {
		let middleware;

		beforeEach(() => {
			middleware = notFound({
				message: 'mock message'
			});
		});

		it('returns a middleware function', () => {
			assert.strictEqual(typeof middleware, 'function');
		});

		describe('middleware(request, response, next)', () => {
			let nextFn;
			let returnValue;

			beforeEach(() => {
				nextFn = td.func();
				returnValue = middleware({}, {}, nextFn);
			});

			it('calls `next` with a 404 error', () => {
				td.verify(nextFn(), {
					ignoreExtraArgs: true,
					times: 1
				});
				const error = td.explain(nextFn).calls[0].args[0];
				assert.ok(error instanceof Error);
				assert.strictEqual(error.status, 404);
				assert.strictEqual(error.statusCode, 404);
				assert.strictEqual(error.message, 'mock message');
			});

			it('returns nothing', () => {
				assert.strictEqual(returnValue, undefined);
			});
		});
	});

	describe('.default', () => {
		it('aliases the module exports', () => {
			assert.strictEqual(notFound, notFound.default);
		});
	});
});
