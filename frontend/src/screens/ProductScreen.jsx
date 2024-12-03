import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from "../components/Rating";
import axios from 'axios';

const ProductScreen = () => {

    const [product, setProducts] = useState([]);

    const { id: productId } = useParams(); // a react router hook

    useEffect(() => { // gets all the products from /api/products and put them in products.
        const fetchProducts = async () => {
            const { data } = await axios.get(`/api/products/${productId}`); // axios.get(`/api/products/${productId}`) - Promise
            setProducts(data);
          }
      
          fetchProducts();
    }, [productId]); // Fetching Data When productId Changes


  return <>

    <Link className="btn btn-light my-3" to='/'>
        Go Back
    </Link>

    <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid></Image>
        </Col>

        <Col md={4}>
            <ListGroup varient='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
                <ListGroup.Item>{product.description} </ListGroup.Item>

            </ListGroup>
            
        </Col>

        <Col md={3}>
            <Card>

                <ListGroup varient='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stuck'}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button 
                            className="btn-block"
                            type='button'
                            disabled={product.countInStock === 0}
                        >
                            Add To Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>

            </Card>
        </Col>
    </Row>

  
  </>
}

export default ProductScreen