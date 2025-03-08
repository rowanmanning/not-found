'use strict';

class NotFoundError extends Error {
	/** @type {string} */
	name = 'NotFoundError';

	/** @type {number} */
	status = 404;

	/** @type {number} */
	statusCode = 404;
}

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
	return (_request, _response, next) => {
		next(new NotFoundError(options.message || 'Not Found'));
	};
}

module.exports = notFound;
module.exports.default = module.exports;
