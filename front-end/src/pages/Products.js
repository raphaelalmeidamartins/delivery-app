import React from 'react';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';

function Products() {
  return (
    <div>
      <NavBar />
      <main>
        {/* Quando o back-end estiver pronto, dar map nos produtos retornados pela API */}
        <ProductCard
          price={ 10 }
          thumbnail="http://placekitten.com/200/300"
          name="Placeholder"
          testId={ 1 }
        />
      </main>
    </div>
  );
}

export default Products;
