import { useTheme } from '@emotion/react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Wrapper from '../components/Wrapper';
import { AppContext } from '../context';
import service from '../service';

function Products() {
  const { products, setProducts, cart } = useContext(AppContext);
  const [errMsg, setErrMsg] = useState('');
  const { palette } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const response = await service.get.products();

      const { status } = response;
      const data = await response.json();

      if (status === StatusCodes.OK) {
        setErrMsg('');
        setProducts(data);
      } else {
        setErrMsg(data.message);
      }
    };

    fetchData();
  }, [setProducts]);

  const navigate = useNavigate();

  const handleClick = () => navigate('/customer/checkout');

  return (
    <Wrapper>
      <Header />
      <Button
        component="button"
        type="button"
        variant="contained"
        data-testid="customer_products__button-cart"
        onClick={ handleClick }
        disabled={ cart.length === 0 }
        size="large"
        sx={ {
          alignItems: 'center',
          bottom: '24px',
          display: 'flex',
          position: 'fixed',
          right: '24px',
          zIndex: 10,
          backgroundColor: palette.secondary.main,
        } }
      >
        Ver Carrinho:
        <span
          data-testid="customer_products__checkout-bottom-value"
          style={ {
            marginLeft: '8px',
            fontSize: '20px',
            fontWeight: 700,
          } }
        >
          {`R$ ${cart
            .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
            .toFixed(2)
            .replace('.', ',')}`}
        </span>
      </Button>
      <Grid
        container
        spacing={ { xs: 3, sm: 3, md: 3 } }
        columns={ { xs: 4, sm: 8, md: 12 } }
        component="main"
      >
        {!!errMsg && <p>{errMsg}</p>}
        {!errMsg
            && products.map((product, index) => (
              <Grid item xs={ 6 } sm={ 4 } md={ 3 } key={ product.id }>
                <ProductCard
                  id={ product.id }
                  index={ index }
                  name={ product.name }
                  price={ Number(product.price) }
                  thumbnail={ product.url_image }
                />
              </Grid>
            ))}
      </Grid>
    </Wrapper>
  );
}

export default Products;
