import assert from 'node:assert';
import { beforeEach, describe, it, type Mock, mock } from 'node:test';
import type { Handler, Request, Response } from 'express';
import { notFound } from '../../index.ts';

describe('not-found', () => {
	describe('notFound()', () => {
		let middleware: Handler;

		beforeEach(() => {
			middleware = notFound();
		});

		it('returns a middleware function', () => {
			assert.strictEqual(typeof middleware, 'function');
		});

		describe('middleware(request, response, next)', () => {
			let nextFn: Mock<(error: unknown) => void>;
			let returnValue: unknown;

			beforeEach(() => {
				nextFn = mock.fn();
				returnValue = middleware({} as Request, {} as Response, nextFn);
			});

			it('calls `next` with a 404 error', () => {
				assert.strictEqual(nextFn.mock.calls.length, 1);
				const error = nextFn.mock.calls[0].arguments[0];
				assert.ok(error instanceof Error);
				assert.ok('status' in error);
				assert.strictEqual(error.status, 404);
				assert.ok('statusCode' in error);
				assert.strictEqual(error.statusCode, 404);
				assert.strictEqual(error.message, 'Not Found');
			});

			it('returns nothing', () => {
				assert.strictEqual(returnValue, undefined);
			});
		});
	});

	describe('notFound(options)', () => {
		let middleware: Handler;

		beforeEach(() => {
			middleware = notFound({
				message: 'mock message'
			});
		});

		it('returns a middleware function', () => {
			assert.strictEqual(typeof middleware, 'function');
		});

		describe('middleware(request, response, next)', () => {
			let nextFn: Mock<(error: unknown) => void>;
			let returnValue: unknown;

			beforeEach(() => {
				nextFn = mock.fn();
				returnValue = middleware({} as Request, {} as Response, nextFn);
			});

			it('calls `next` with a 404 error', () => {
				assert.strictEqual(nextFn.mock.calls.length, 1);
				const error = nextFn.mock.calls[0].arguments[0];
				assert.ok(error instanceof Error);
				assert.ok('status' in error);
				assert.strictEqual(error.status, 404);
				assert.ok('statusCode' in error);
				assert.strictEqual(error.statusCode, 404);
				assert.strictEqual(error.message, 'mock message');
			});

			it('returns nothing', () => {
				assert.strictEqual(returnValue, undefined);
			});
		});
	});
});
