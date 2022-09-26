import PropTypes from 'prop-types';
import React, { createContext, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AppContext = createContext({});

function AppProvider({ children }) {
  const userDataStored = window.localStorage.getItem('userData');
  const [userData, setUserData] = useState(JSON.parse(userDataStored) || {});
  const [productsData, setProductsData] = useState([]);
  const contextValue = useMemo(() => (
    {
      userData,
      setUserData,
      productsData,
      setProductsData,
    }), [userData, productsData]);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!Object.keys(userData).length || !Object.keys(productsData).length) {
      window.localStorage.removeItem('userData');
      if (!['/login', '/register'].includes(pathname)) {
        navigate('/login');
      }
      window.localStorage.setItem('userData', JSON.stringify(userData));
    }
    if (!Object.keys(productsData).length) {
      window.localStorage.removeItem('productsData');
      navigate('/customer/products');
    }
  }, [userData, productsData, pathname, navigate]);

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default AppProvider;
export { AppContext };
