import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {

    const { id: productid } = useParams();

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productid);



  return (
    <> 
        <Link className="btn btn-light my-3" to='/'>
            Go Back
        </Link>

        { isLoading ? (
            <h2>Loading...</h2>
        ) : error ? (<div>{ error?.data?.message || error.error }</div>) : 
        (<Row>
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
        </Row>) 
    }

        
    </>

    )
    }

export default ProductScreen