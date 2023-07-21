'use strict';

const assert = require('node:assert');
const td = require('testdouble');

describe('lib/not-found', () => {
	let createHttpError;
	let mockHttpError;
	let notFound;

	beforeEach(() => {

		// Mock the http-errors module
		mockHttpError = new Error('mock http error');
		createHttpError = td.replace('http-errors', td.func());

		notFound = require('../../../lib/not-found');
	});

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
				td.when(createHttpError(
					td.matchers.anything(),
					td.matchers.anything()
				)).thenReturn(mockHttpError);
				nextFn = td.func();
				returnValue = middleware({}, {}, nextFn);
			});

			it('creates an HTTP 404 error with the default message', () => {
				td.verify(createHttpError(404, 'Not Found'), {
					times: 1
				});
			});

			it('calls `next` with the created HTTP error', () => {
				td.verify(nextFn(mockHttpError), {
					times: 1
				});
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
				td.when(createHttpError(
					td.matchers.anything(),
					td.matchers.anything()
				)).thenReturn(mockHttpError);
				nextFn = td.func();
				returnValue = middleware({}, {}, nextFn);
			});

			it('creates an HTTP 404 error with `options.message`', () => {
				td.verify(createHttpError(404, 'mock message'), {
					times: 1
				});
			});

			it('calls `next` with the created HTTP error', () => {
				td.verify(nextFn(mockHttpError), {
					times: 1
				});
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
