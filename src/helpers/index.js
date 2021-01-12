export default function fetchPlayerToken() {
  return async () => {
    const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = resolve.json();
    return json;
  };
}
