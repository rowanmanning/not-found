/**
 * @module @rowanmanning/not-found
 */
'use strict';

const createHttpError = require('http-errors');

/**
 * Create an Express middleware function which results in
 * an HTTP 404 Not Found error.
 *
 * @access public
 * @param {object} [options={}]
 *     An options object used to configure the middleware.
 * @param {string} [options.message='Not Found']
 *     Change the output error message.
 * @returns {import('express').Handler}
 *     Returns a middleware function.
 */
module.exports = function notFound(options = {}) {
	return (request, response, next) => {
		next(createHttpError(404, options.message || 'Not Found'));
	};
};
