import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { requestData, setToken } from '../../services/requests';
import localStorage from '../../utils/localStorage';

function Products() {
  const [products, setProducts] = useState([]);
  const { name: userName } = localStorage.get('user');
  const [cart, setCart] = useState([]);

  const carrinho = cart.reduce((acc, curr) => ({
    name: curr.name,
    subTotal: (parseFloat(acc.price) + parseFloat(curr)).toFixed(2),
  }), 0);

  console.log(carrinho);

  useEffect(() => {
    const getProducts = async () => {
      const { token } = localStorage.get('user');
      setToken(token);
      const response = await requestData('/customer/products');
      setProducts(response);
    };
    getProducts();
  }, []);

  const addItem = (obj) => {
    const { id: productId, name, price } = obj;

    setCart([...cart, { productId, name, price }]);
  };

  const renderProducts = () => products
    .map(({ id, name, urlImage, price }) => products.length > 0 && (
      <ProductCard
        key={ id }
        id={ id }
        name={ name }
        image={ urlImage }
        price={ price }
        add={ addItem }

      />
    ));

  return (
    <div>
      <Header screenType="products" userType="customer" userName={ userName } />
      <div>
        {renderProducts()}
      </div>
    </div>
  );
}

export default Products;
