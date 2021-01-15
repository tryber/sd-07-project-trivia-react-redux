export const requestToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const fetchingApi = await fetch(url);
  const jsonApi = await fetchingApi.json();
  return jsonApi;
};

export const requestCategories = async () => {
  const url = 'https://opentdb.com/api_category.php';
  const fetchingApi = await fetch(url);
  const jsonApi = await fetchingApi.json();
  return jsonApi;
};

const getURL = (array) => {
  const filteredArray = array.filter((item) => item.value !== 'random');
  const threeParams = 3;
  const twoParams = 2;
  if (filteredArray.length === threeParams) {
    const [one, two, three] = filteredArray;
    return `https://opentdb.com/api.php?amount=5&category=${one.value}&difficulty=${two.value}&type=${three.value}&token=`;
  }
  if (filteredArray.length === twoParams) {
    const [one, two] = filteredArray;
    console.log(one);
    console.log(two);
    return `https://opentdb.com/api.php?amount=5&${one.name}=${one.value}&${two.name}=${two.value}&token=`;
  }
  if (filteredArray.length === 1) {
    const { name, value } = filteredArray[0];
    return `https://opentdb.com/api.php?amount=5&${name}=${value}&token=`;
  }
  return 'https://opentdb.com/api.php?amount=5&token=';
};

export const requestQuestions = async ({ token, category, difficulty, type }) => {
  const checkUrl = getURL([
    {
      name: 'category',
      value: category,
    },
    { name: 'difficulty',
      value: difficulty,
    },
    { name: 'type',
      value: type,
    },
  ]);
  const url = `${checkUrl}${token}`;
  const fetchingApi = await fetch(url);
  const jsonApi = await fetchingApi.json();
  return jsonApi;
};
