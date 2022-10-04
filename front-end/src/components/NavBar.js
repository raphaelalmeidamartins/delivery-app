import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import NavBarItem from './NavBarItem';

function NavBar() {
  const { userData, setUserData } = useContext(AppContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    navigate(path);
  };

  const handleLogout = () => {
    setUserData({});
  };

  const LINK_ORDERS_TESTID = 'customer_products__element-navbar-link-orders';

  const paths = {
    customer: [
      {
        name: 'Produtos',
        path: '/customer/products',
        testId: 'customer_products__element-navbar-link-products',
      },
      {
        name: 'Meus Pedidos',
        path: '/customer/orders',
        testId: LINK_ORDERS_TESTID,
      },
    ],
    seller: [
      {
        name: 'Pedidos',
        path: '/seller/orders',
        testId: LINK_ORDERS_TESTID,
      },
    ],
    administrator: [
      {
        name: 'Gerenciar Usuários',
        path: '/admin/manage',
        testId: LINK_ORDERS_TESTID,
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={ handleOpenNavMenu }
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={ anchorElNav }
            anchorOrigin={ {
              vertical: 'bottom',
              horizontal: 'left',
            } }
            keepMounted
            transformOrigin={ {
              vertical: 'top',
              horizontal: 'left',
            } }
            open={ Boolean(anchorElNav) }
            onClose={ handleCloseNavMenu }
            sx={ {
              display: { xs: 'block', md: 'none' },
            } }
          >
            {userData?.role
                && paths[userData.role].map((data) => (
                  <NavBarItem
                    key={ data.testId }
                    { ...data }
                    onClick={ handleCloseNavMenu }
                  />
                ))}
          </Menu>
        </Box>
        <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
          {userData?.role
              && paths[userData.role].map((data) => (
                <NavBarItem
                  key={ data.testId }
                  { ...data }
                  onClick={ handleCloseNavMenu }
                  button
                />
              ))}
        </Box>
        <Box sx={ { flexGrow: 0, alignItems: 'center', display: 'flex' } }>
          <Typography
            variant="body1"
            data-testid="customer_products__element-navbar-user-full-name"
            sx={ { marginRight: '20px' } }
          >
            {userData?.name}
          </Typography>
          <IconButton
            data-testid="customer_products__element-navbar-link-logout"
            size="large"
            onClick={ handleLogout }
            sx={ { marginLeft: '20px', p: 0 } }
          >
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </Container>
  );
}

export default NavBar;
