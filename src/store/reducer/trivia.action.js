export const REQUEST_QUERIES = 'REQUEST_QUERIES';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const LIST_QUERIES = 'LIST_QUERIES';

export const requestQueries = () => ({
  type: REQUEST_QUERIES,
});

export const failedRequest = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export const listQueries = (Queries) => ({
  type: LIST_QUERIES,
  payload: Queries,
});
