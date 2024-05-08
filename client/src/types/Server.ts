export interface ServerError {
	error: boolean;
	message: string;
}

export type ServerResponse = ServerError | string;
