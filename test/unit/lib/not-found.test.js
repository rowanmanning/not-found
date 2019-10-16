'use strict';

const assert = require('proclaim');

describe('lib/not-found', () => {
	let notFound;

	beforeEach(() => {
		notFound = require('../../../lib/not-found');
	});

	describe('notFound()', () => {
		let returnValue;

		beforeEach(() => {
			returnValue = notFound();
		});

		it('returns true', () => {
			assert.isTrue(returnValue);
		});

	});

});
