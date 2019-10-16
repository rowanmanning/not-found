/**
 * @rowanmanning/not-found module
 * @module @rowanmanning/not-found
 */
'use strict';

const createHttpError = require('http-errors');

/**
 * Create an Express middleware function which results in
 * an HTTP 404 Not Found error.
 *
 * @access public
 * @param {Object} [options={}]
 *     An options object used to configure the middleware.
 * @param {String} [options.message='Not Found']
 *     Change the output error message.
 * @returns {ExpressMiddleware}
 *     Returns a middleware function.
 */
module.exports = function notFound(options = {}) {
	return (request, response, next) => {
		next(createHttpError(404, options.message));
	};
};

/**
 * A middleware function.
 * @callback ExpressMiddleware
 * @param {Object} request
 *     An Express Request object.
 * @param {Object} response
 *     An Express Response object.
 * @param {ExpressMiddlewareCallback} next
 *     A callback function.
 * @returns {undefined}
 *     Returns nothing.
 */

/**
 * A callback function.
 * @callback ExpressMiddlewareCallback
 * @param {Error} error
 *     An HTTP error.
 * @returns {undefined}
 *     Returns nothing.
 */
