import {Row, Col, ButtonGroup, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery, useGetCategoriesQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../assets/styles/HomeScreen.css';
import { useState } from 'react';
import Paginate from '../components/Paginate';
import { useSelector } from 'react-redux';

const HomeScreen = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  
  const { pageNumber } = useParams();

  const { data, isLoading: productsLoading, error: productsError } = useGetProductsQuery({ category: selectedCategory, pageNumber });
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();

  const { userInfo } = useSelector((state) => state.auth);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="error-container">
        <Message variant='danger'>{ productsError?.data?.message || productsError.error }</Message>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="error-container">
        <Message variant='danger'>{ categoriesError?.data?.message || categoriesError.error }</Message>
      </div>
    );
  }

  return <>
    <div className="home-container">
      <div className="hero-section">
        <h1 className="main-heading">Latest Products</h1>
        <p className="subheading">Discover our official collection</p>
        
        <div className="categories-container">
          <Button 
            variant={selectedCategory === '' ? 'primary' : 'outline-primary'}
            className="category-button"
            onClick={() => handleCategoryChange('')}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline-primary'}
              className="category-button"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Row className="products-row">
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="product-col">
            <div className="product-wrapper">
              <Product product={product}/>
            </div>
          </Col>
        ))}
      </Row>

      <Paginate pages={data.pages} page={data.page}></Paginate> {/* page component buttom left */}
    </div>

    <small style={{color:"#F6F0F0"}}>type /easteregg in the url to see magic</small>

  </>
}

export default HomeScreen