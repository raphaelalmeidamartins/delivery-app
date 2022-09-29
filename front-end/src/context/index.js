import PropTypes from 'prop-types';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AppContext = createContext({});

function AppProvider({ children }) {
  const userDataStored = window.localStorage.getItem('user');
  const cartStored = window.localStorage.getItem('cart');
  const [userData, setUserData] = useState(JSON.parse(userDataStored) || {});
  const [cart, setCart] = useState(JSON.parse(cartStored) || []);
  const [products, setProducts] = useState([]);

  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
      products,
      setProducts,
      cart,
      setCart,
    }),
    [userData, products, cart],
  );
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const IsLoginOrRegisterPage = ['/login', '/register'].includes(pathname);
    const isThereUserData = Object.keys(userData).length;

    const homepages = {
      customer: '/customer/products',
      seller: '/seller/orders',
      admin: '/admin/manage',
    };

    if (!isThereUserData && !IsLoginOrRegisterPage) {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('cart');
      if (!IsLoginOrRegisterPage) {
        navigate('/login');
      }
    } else if (!IsLoginOrRegisterPage) {
      window.localStorage.setItem('user', JSON.stringify(userData));
      window.localStorage.setItem('cart', JSON.stringify(cart));
    } else if (IsLoginOrRegisterPage) {
      navigate(homepages[userData.role], { replace: true });
    }
  }, [userData, cart, pathname, navigate]);

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
