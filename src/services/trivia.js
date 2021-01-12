//  let resp = fetch('https://opentdb.com/api_token.php?command=request').then((response) => response.json()).then((data) => { console.log(data.token) });

const getToken = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem('token', data.token);
    return (data.token);
  });

export default getToken;
