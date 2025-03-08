import type { Handler } from '@types/express';

interface Options {
	message?: string | undefined;
}

export function notFound(options?: Options): Handler;
