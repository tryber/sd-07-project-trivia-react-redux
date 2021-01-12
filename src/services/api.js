const returnToken = () => fetch('https://opentdb.com/api_token.php?command=request').then((result) => result.json().then((object) => object.token));
const returnAsks = (target) => fetch(`https://opentdb.com/api.php?amount=5&token=${target}`).then((result) => result.json().then((object) => object));

export default { returnToken, returnAsks };
