export { default as fetchTrivia } from './fetchTrivia';
export { default as fetchToken } from './fetchToken';

const addEmail = (email) => ({ type: 'ADD_EMAIL', email });

export default addEmail;
