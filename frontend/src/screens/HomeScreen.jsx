import {Row, Col, ButtonGroup, Button} from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery, useGetCategoriesQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../assets/styles/HomeScreen.css';
import { useEffect, useState } from 'react';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortType, setSortType] = useState('');
  
  const { pageNumber, keyword } = useParams();

  const { data, isLoading: productsLoading, error: productsError } = useGetProductsQuery({ category: selectedCategory, pageNumber, keyword, sort: sortType });
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  useEffect(() => {
    setSortType(sortType);
  }, [sortType])

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
    {!keyword ? <ProductCarousel/> : <Link to='/' className="btn btn-light my-3 mb-4">Go Back</Link>}
    
    <div className="home-container">
      <div className="hero-section">
        <Meta></Meta>
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

      <select className='form-select my-3' value={sortType}  onChange={(e) => setSortType(e.target.value)}>
        <option value="">Sort By:</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
      </select>


      <Row className="products-row">
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="product-col">
            <div className="product-wrapper">
              <Product product={product}/>
            </div>
          </Col>
        ))}
      </Row>

      <Paginate pages={data.pages} page={data.page} keyword = {keyword ? keyword : ''}></Paginate> {/* page component buttom left */}
    </div>

    <small style={{color:"#F6F0F0"}}>type /easteregg in the url to see magic</small>

  </>
}

export default HomeScreen