const headers = {
  Accept: 'application/json, text/plain, */*',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const service = {

  post: {
    async login(loginData) {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify(loginData),
      });
      return response;
    },
    async user(registerData) {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/customers`, {
        method: 'POST',
        headers,
        body: JSON.stringify(registerData),
      });
      return response;
    },
  },
  get: {
    async products() {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/customer/products`, {
        method: 'GET',
        headers,
      });
      return response;
    },
  },
};

export default service;
