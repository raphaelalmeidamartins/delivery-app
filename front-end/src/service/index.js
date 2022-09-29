const headers = {
  Accept: 'application/json, text/plain, */*',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const service = {
  post: {
    async login(loginData) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/login`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(loginData),
        },
      );
      return response;
    },
    async users(Authorization, userData) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/users`,
        {
          method: 'POST',
          headers: { ...headers, Authorization },
          body: JSON.stringify(userData),
        },
      );
      return response;
    },
    async customers(registerData) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/customers`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(registerData),
        },
      );
      return response;
    },
    async sales(Authorization, saleData) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sales`,
        {
          method: 'POST',
          headers: { ...headers, Authorization },
          body: JSON.stringify(saleData),
        },
      );
      return response;
    },
  },
  get: {
    async products() {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/products`,
        {
          method: 'GET',
          headers,
        },
      );
      return response;
    },
    async sellers() {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sellers`,
        {
          method: 'GET',
          headers,
        },
      );
      return response;
    },
    async byUser(Authorization) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sales/byUser`,
        {
          method: 'GET',
          headers: { ...headers, Authorization },
        },
      );
      return response;
    },
    async bySeller(Authorization) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sales/bySeller`,
        {
          method: 'GET',
          headers: { ...headers, Authorization },
        },
      );
      return response;
    },
    async bySaleId(Authorization, id) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sales/${id}`,
        {
          method: 'GET',
          headers: { ...headers, Authorization },
        },
      );
      return response;
    },
  },
  put: {
    async updateSaleById(Authorization, id) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sales/${id}`,
        {
          method: 'PUT',
          headers: { ...headers, Authorization },
        },
      );
      return response;
    },
  },
  delete: {
    async deleteSaleById(Authorization, id) {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/sales/${id}`,
        {
          method: 'DELETE',
          headers: { ...headers, Authorization },
        },
      );
      return response;
    },
  },
};

export default service;
