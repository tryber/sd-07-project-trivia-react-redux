const getToken = async () => {
  const fetchRequest = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  const json = fetchRequest.json();
  return json;
};

export default getToken;
