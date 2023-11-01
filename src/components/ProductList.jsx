import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
  font-family: Arial, sans-serif;
`;

const ProductCard = styled.div`
  width:100vw;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  background-color: #f7f7f7;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center; 
  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }

  /* Updated styling for 3 cards in a row */
  @media (min-width: 769px) {
    display:flex;
    margin:1vw;
    width:35vw;
  }
  @media (max-width: 769px) {
    
    width:70vw;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }

  img {
    max-width: 50%;
    height: 50%;
  }

  h3 {
    font-size: 20px;
    margin: 10px 0;
  }

  p {
    font-size: 16px;
    margin: 8px 0;
  }
`;

const Filters = styled.div`
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s; /* Add a transition for a smoother change */

  @media (max-width: 768px) {
    gap:3vw;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterSelect = styled.select`
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 16px;
  transition: width 0.3s; /* Add a transition for width changes */

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 16px;
  transition: width 0.3s; /* Add a transition for width changes */

  @media (max-width: 768px) {
    width: 89%;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: inline-block;
    padding: 0;
    margin: 0;
    list-style: none;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    li {
      display: inline;
      margin: 0;
      padding: 0;

      a {
        padding: 10px 15px;
        text-decoration: none;
        display: inline-block;
        background-color: #f7f7f7;
        color: #333;
        border-radius: 10px;

        &:hover {
          background-color: #333;
          color: #fff;
          cursor:pointer;
        }
      }
    }
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (priceFilter) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(priceFilter)
      );
    }

    if (searchFilter) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, priceFilter, searchFilter, products]);

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  return (
    <div>
      <ProductListContainer>
        <Filters>
          
        <div style={{
           display:"flex",
           alignItems:"center",
            gap:"5px",
          }}>
            <label>Category:</label>
            <FilterSelect onChange={handleCategoryFilterChange}>
              <option  value="all">All</option>
              {categories.map((category) => (
                <option style={{width:"100px"}} key={category} value={category}>
                  {category}
                </option>
              ))}
            </FilterSelect>
          </div>
          <div style={{
           display:"flex",
           alignItems:"center",
            gap:"5px",
          }}>
            <label>Price:</label>
            <FilterInput
            // style={{width:"80px"}} 
              type="number"
              placeholder="Min Price"
              onChange={handlePriceFilterChange}
            />
            <FilterInput
            // style={{width:"80px"}}
              type="number"
              placeholder="Max Price"
              onChange={handlePriceFilterChange}
            />
          </div>
          <div style={{
           display:"flex",
           alignItems:"center",
            gap:"5px",
          }}>
            <label>Search:</label>
            <FilterInput
              type="text"
              placeholder="Search by title"
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
        </Filters>
        
        {currentProducts.map((product) => (
            
          <ProductCard key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </ProductCard>
        ))}
        
      </ProductListContainer>
      <Pagination>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Pagination>
    </div>
  );
};

export default ProductList;
