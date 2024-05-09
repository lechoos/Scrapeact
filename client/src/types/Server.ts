export interface ServerError {
	message: string;
}

export type ServerResponse = ServerError | string;
