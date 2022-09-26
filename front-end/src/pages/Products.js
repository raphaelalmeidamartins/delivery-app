import React from 'react';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import service from '../service';

const products = async (productsData) => {
  const response = await service.get.products({
    productsData,
  });
  return response;
};

function Products() {
  return (
    <div>
      <NavBar />
      <main>
        {products.map((item) => {
          <ProductCard
            key={ item.id }
            price={ Number(item.price) }
            thumbnail={ item.urlImage }
            name={ item.name }
            testId={ item.id }
          />;
        })}

      </main>
    </div>
  );
}

export default Products;
