'use strict';

const createHttpError = require('http-errors');

/**
 * Create an Express middleware function which results in
 * an HTTP 404 Not Found error.
 *
 * @public
 * @param {object} [options]
 *     An options object used to configure the middleware.
 * @param {string} [options.message]
 *     Change the output error message.
 * @returns {import('express').Handler}
 *     Returns a middleware function.
 */
function notFound(options = {}) {
	return (request, response, next) => {
		next(createHttpError(404, options.message || 'Not Found'));
	};
}

module.exports = notFound;
module.exports.default = module.exports;
