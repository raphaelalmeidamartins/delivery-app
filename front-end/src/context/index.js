import PropTypes from 'prop-types';
import React, { createContext, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AppContext = createContext({});

function AppProvider({ children }) {
  const userDataStored = window.localStorage.getItem('userData');
  const [userData, setUserData] = useState(JSON.parse(userDataStored) || {});
  const contextValue = useMemo(() => ({ userData, setUserData }), [userData]);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!Object.keys(userData).length) {
      window.localStorage.removeItem('userData');
      if (!['/login', '/register'].includes(pathname)) {
        navigate('/login');
      }
    } else {
      window.localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData, pathname, navigate]);

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
