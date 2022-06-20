export interface RequestState<Data> {
    data: Data | undefined,
    loading: boolean,
    error: Error | undefined,
}

export interface RequestFunctions {
    refetch: () => Promise<void>,
    cancel: () => void,
}

export type Props<Data> = RequestState<Data> & RequestFunctions;

export type Action<Data> =
| { type: 'REQUEST_INIT' }
| { type: 'REQUEST_ABORT' }
| { type: 'REQUEST_SUCCESS'; payload: Data }
| { type: 'REQUEST_FAILED'; payload: Error };