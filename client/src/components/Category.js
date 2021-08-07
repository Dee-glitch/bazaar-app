import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCategory = (category) => {
    setCategoryName(category);
  };

  return (
    <>
      <h3 className="text-center">CATEGORIES</h3>
      <div
        style={{
          border: '1px solid var(--color-main)',
        }}
      >
        {categories.length !== 0 &&
          categories.map((category) => {
            return (
              <div key={category._id} className=" p-3 text-center">
                <Link to={`/products/${category.name}`}>
                  <Button
                    onClick={() => handleCategory(category)}
                    style={{
                      color: 'var(--color-main)',
                      background: 'var(--color-light-grey)',
                      border: '1px solid transparent',
                      borderRadius: '20px',
                      minWidth: '170px',
                      padding: '10px 0',
                    }}
                  >
                    {category.name}
                  </Button>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Category;
