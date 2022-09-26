import React from 'react';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import service from '../service';
import { AppContext } from '../context';

function Products() {
  const { productsData, setProductsData } = React.useContext(AppContext);

  React.useEffect(() => {
    service.get.products().then((response) => response.json()).then((data) => {
      setProductsData(data);
    });
  }, [setProductsData]);

  return (
    <div>
      <NavBar />
      <main>
        {productsData.map((product, index) => (
          <ProductCard
            key={ product.id }
            testId={ index }
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
