import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { requestData, setToken } from '../../services/requests';
// import localStorage from '../../utils/localStorage';

function Products() {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const { token, name } = JSON.parse(localStorage.getItem('user'));
      setUserName(name);
      setToken(token);
      const response = await requestData('/customer/products');
      setProducts(response);
    };
    getProducts();
  }, []);

  const renderProducts = () => products
    .map(({ id, name, urlImage, price }) => products.length > 0 && (
      <ProductCard
        key={ id }
        id={ id }
        name={ name }
        image={ urlImage }
        price={ price }
      />
    ));

  return (
    <div>
      <Header screenType="products" userName={ userName } userType="customer" />
      <div>
        {renderProducts()}
      </div>
    </div>
  );
}

export default Products;
