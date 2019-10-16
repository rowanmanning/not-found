'use strict';

const assert = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/not-found', () => {
	let createHttpError;
	let mockHttpError;
	let notFound;

	beforeEach(() => {

		// Mock the http-errors module
		mockHttpError = new Error('mock http error');
		createHttpError = sinon.stub().returns(mockHttpError);
		mockery.registerMock('http-errors', createHttpError);

		notFound = require('../../../lib/not-found');
	});

	describe('notFound()', () => {
		let middleware;

		beforeEach(() => {
			middleware = notFound();
		});

		it('returns a middleware function', () => {
			assert.isFunction(middleware);
		});

		describe('middleware(request, response, next)', () => {
			let next;
			let returnValue;

			beforeEach(() => {
				next = sinon.spy();
				returnValue = middleware({}, {}, next);
			});

			it('creates an HTTP 404 error with the default message', () => {
				assert.calledOnce(createHttpError);
				assert.calledWithExactly(createHttpError, 404, undefined);
			});

			it('calls `next` with the created HTTP error', () => {
				assert.calledOnce(next);
				assert.calledWithExactly(next, mockHttpError);
			});

			it('returns nothing', () => {
				assert.isUndefined(returnValue);
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
			assert.isFunction(middleware);
		});

		describe('middleware(request, response, next)', () => {
			let next;
			let returnValue;

			beforeEach(() => {
				next = sinon.spy();
				returnValue = middleware({}, {}, next);
			});

			it('creates an HTTP 404 error with `options.message`', () => {
				assert.calledOnce(createHttpError);
				assert.calledWithExactly(createHttpError, 404, 'mock message');
			});

			it('calls `next` with the created HTTP error', () => {
				assert.calledOnce(next);
				assert.calledWithExactly(next, mockHttpError);
			});

			it('returns nothing', () => {
				assert.isUndefined(returnValue);
			});

		});

	});

});
