import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../assets/styles/HomeScreen.css';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="home-container">
      { isLoading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : error ? (
        <div className="error-container">
          <Message variant='danger'>{ error?.data?.message || error.error }</Message>
        </div>
      ) : (
        <>
          <div className="hero-section">
            <h1 className="main-heading">Latest Products</h1>
            <p className="subheading">Discover our official collection</p>
          </div>
          <Row className="products-row">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="product-col">
                <div className="product-wrapper">
                  <Product product={product}/>
                </div>
              </Col>
            ))}
          </Row>
        </>
      ) 
      }
    </div>
  )
}

export default HomeScreen