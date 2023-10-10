import React, { useState } from 'react';
import './App.css';
import ProductsData from './products.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(ProductsData.produtos);

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const classification = (value) => {
    if (value === 'menorPreco') {
      const sortedProducts = products.slice().sort((a, b) => a.preco - b.preco);
      setProducts(sortedProducts);
    } else if (value === 'maiorPreco') {
      const sortedProducts = products.slice().sort((a, b) => b.preco - a.preco);
      setProducts(sortedProducts);
    }
  };

  return (
    <div className="App">
      <div className='top'>
        <input className="search-top" type="search" placeholder="Buscar produto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className='form'>
          <label>Classificar por:</label>
          <select className='rank' onChange={(e) => classification(e.target.value)}>
            <option value="" disabled selected>Escolha uma opção</option>
            <option value="menorPreco">Menor Preço</option>
            <option value="maiorPreco">Maior Preço</option>
          </select>
        </div>
      </div>

      <div className='box'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.nome} className="product-item">
              <div className="image-container">
                <img src={product.img} alt={product.nome} />
              </div>
              <strong>{product.nome}</strong> <br /><br />
              <strong>R$ {product.preco}</strong> <br />
              <div className='button'>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <button className="buy">Comprar</button>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div><strong>Nenhum produto encontrado.</strong></div>
        )}
      </div>
    </div>
  );
}

export default App;
