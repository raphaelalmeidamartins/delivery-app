import PropTypes from 'prop-types';
import React, { createContext, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext({});

function AppProvider({ children }) {
  const [userData, setUserData] = useState({ role: 'customer', username: 'Raphael' });
  const contextValue = useMemo(() => ({ userData, setUserData }), [userData]);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!userData) {
      window.localStorage.removeItem('userData');
      navigate('/login');
    } else {
      window.localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData, navigate]);

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
