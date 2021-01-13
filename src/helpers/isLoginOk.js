const isLoginOk = (email) => {
  const regTest = (/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);
  return !email.match(regTest);
};

export default isLoginOk;
