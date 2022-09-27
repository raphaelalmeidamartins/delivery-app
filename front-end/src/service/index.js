/* eslint-disable sonarjs/no-duplicate-string */
const service = {
  post: {
    async login(loginData) {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      return response;
    },
    async user(registerData) {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/customers`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      return response;
    },
    async manage(manageData) {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manageData),
      });
      return response;
    },
  },
};

export default service;
