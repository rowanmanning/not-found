import type { Handler } from 'express';

interface Options {
	message?: string | undefined;
}

class NotFoundError extends Error {
	override name = 'NotFoundError';
	readonly status = 404;
	readonly statusCode = 404;
}

export function notFound(options: Options = {}): Handler {
	return (_request, _response, next) => {
		next(new NotFoundError(options.message || 'Not Found'));
	};
}
