import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { requestData, setToken } from '../../services/requests';
import localStorage from '../../utils/localStorage';

function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const { token } = localStorage.get('info');
      setToken(token);
      const response = await requestData('/customer/products');
      setProducts(response);
    };
    getProducts();
  }, []);

  return (
    <div>
      <Header />

    </div>
  );
}

export default Products;
