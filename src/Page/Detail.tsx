import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Detail.css';
interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
}

const Detail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Link to="/home" className='btn'>Back</Link>
    <div className="detail-container">
      <img src={product.thumbnail} alt={product.title} className="detail-image" />
      <h1 className="detail-title">{product.title}</h1>
      <p className="detail-price">Price: ${product.price}</p>
      <p className="detail-stock">Stock: {product.stock}</p>
    </div>
    </div>
  );
};

export default Detail;
