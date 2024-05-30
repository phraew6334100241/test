import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Home.css';
interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [dropdownValue, setDropdownValue] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products); // Access the products array from the response
      setFilteredProducts(response.data.products); 
    };
    fetchData();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
        
      );
      
      setFilteredProducts(filtered);
    }, 1000);

    return () => clearTimeout(debounce); // Cleanup timeout if searchTerm changes
  }, [searchTerm, products]);

  const handleDetailClick = (productId: number) => {
    window.location.href = `/detail/${productId}`;
  };

  return (
    <div>
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search for a product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br/>
      <select
        value={dropdownValue}
        onChange={(e) => setDropdownValue(e.target.value)}
      >
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
        <option value="option5">Option 5</option>
      </select>
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
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td><img src={product.thumbnail} alt={product.title} style={{ width: 50, height: 50 }}/></td>
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
