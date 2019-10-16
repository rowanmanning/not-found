'use strict';

const assert = require('proclaim');

describe('index', () => {
	let index;
	let notFound;

	beforeEach(() => {
		index = require('../../index');
		notFound = require('../../lib/not-found');
	});

	it('aliases `lib/not-found`', () => {
		assert.strictEqual(index, notFound);
	});

});
