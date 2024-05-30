import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data);
    };
    fetchData();
  }, []);

  const handleDetailClick = (productId: number) => {
    window.location.href = `/detail/${productId}`;
  };

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={product.thumbnail} alt={product.title} /></td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td><button onClick={() => handleDetailClick(product.id)}>Detail</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
