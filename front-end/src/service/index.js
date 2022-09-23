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
      const userData = await response.json();
      return userData;
    },
    async user(registerData) {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const userData = await response.json();
      return userData;
    },
  },
};

export default service;
