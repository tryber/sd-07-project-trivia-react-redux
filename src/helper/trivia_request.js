const defaultNumberQuest = 5;

export const tokenGetter = async () => {
  try {
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const jsonResponse = await response.json();
    console.log('Seu token é ', json.token);
    return jsonResponse.token;
  } catch (error) {
    console.log(error);
  }
};

// code 0 : retorna objeto de perguntas.
// code 3 : token invalido.
export const questionsGetter = async (token, numQuestions = defaultNumberQuest) => {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${numQuestions}&token=${token}`,
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
