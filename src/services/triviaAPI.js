const TRIVIA_TOKEN_API = 'https://opentdb.com';

/* const numberOfQuestions = 5; */

/*
https://opentdb.com/api_token.php?command=request
const TRIVIA_QUESTIONS_API = `https://opentdb.com/api.php?amount=${ numberOfQuestions }&token=${ token }`; */

const getToken = async () => {
  const tokenRequest = await fetch(`${TRIVIA_TOKEN_API}/api_token.php?command=request`);
  const tokenJson = await tokenRequest.json();
  return tokenJson;
};

export default getToken;
