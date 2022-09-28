import Button from '@mui/material/Button';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context';
import service from '../service';

function Products() {
  const { products, setProducts, cart } = useContext(AppContext);
  const [errMsg, setErrMsg] = useState('');

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
    <div>
      <NavBar />
      <Button
        component="button"
        type="button"
        variant="contained"
        data-testid="customer_products__button-cart"
        onClick={ handleClick }
        disabled={ cart.length === 0 }
      >
        Ver Carrinho: R$
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">
          {cart
            .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
            .toFixed(2)
            .replace('.', ',')}
        </span>
      </Button>
      <main>
        {!!errMsg && <p>{errMsg}</p>}
        {!errMsg
          && products.map((product, index) => (
            <ProductCard
              key={ product.id }
              id={ product.id }
              index={ index }
              name={ product.name }
              price={ Number(product.price) }
              thumbnail={ product.url_image }
            />
          ))}
      </main>
    </div>
  );
}

export default Products;
