import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import service from '../service';

const products = service.get.products();

const navigate = useNavigate();

const handleNavigate = () => {
  navigate('/customer/checkout', { replace: true });
};

function Products() {
  return (
    <div>
      <NavBar />
      <main>
        {Object.keys(products).map((item) => (
          <ProductCard
            key={ item.id }
            price={ Number(item.price) }
            thumbnail={ item.url_image }
            name={ item.name }
            testId={ item.id }
          />
        ))}
        <button
          type="button"
          onClick={ handleNavigate }
          data-testid="customer_products__checkout-bottom-value"
        >
          Ver Carrinho
        </button>
      </main>
    </div>
  );
}

export default Products;
