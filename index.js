'use strict';

/**
 * @import { notFound } from '.'
 */

class NotFoundError extends Error {
	/** @override */
	name = 'NotFoundError';
	status = 404;
	statusCode = 404;
}

/** @type {notFound} */
exports.notFound = function notFound(options = {}) {
	return (_request, _response, next) => {
		next(new NotFoundError(options.message || 'Not Found'));
	};
};
