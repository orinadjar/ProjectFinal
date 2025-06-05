import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery, useCreateRwviewMutation } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import '../assets/styles/ProductScreen.css'
import Meta from "../components/Meta";


const ProductScreen = () => {

    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty,setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);

    const [createReview, { isLoading: loadingProductReview }] = useCreateRwviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
    
            await createReview({
                productId,
                rating,
                comment
            }).unwrap();
    
            refetch();
    
            toast.success('Review Submitted');
            setRating(0);
            setComment('');

        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }


  return (
    <> 
        <Link className="btn btn-light my-3" to='/'>
            Go Back
        </Link>


        { isLoading ? (
            <Loader></Loader>
        ) : error ? (<Message variant='danger'>{ error?.data?.message || error.error }</Message>) : 
        (<>
        <Meta title={product.name}></Meta> 
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

                    <ListGroup.Item className="bold-blue">Price: ${product.price} </ListGroup.Item>
                    <ListGroup.Item className="bold-black">{product.description} </ListGroup.Item>

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

                        { product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as='select' value = {qty} onChange = {(e) => setQty(Number(e.target.value))}>
                                            { [...Array(product.countInStock).keys()].map((x) => ( /* array of numbers until the count in stock number */
                                                <option key={ x + 1 } value={ x + 1 }>
                                                    { x + 1 }
                                                </option>
                                            ))  } 
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ) }

                        <ListGroup.Item>
                            <Button 
                                className="btn-block"
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>

                </Card>
            </Col>
        </Row>
        
        <Row className="reviews">

            <Col md={6}>
                <h2 className="mt-2">Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup varient='flush'>
                    { product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}> 
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                        <h2>Write a customer review</h2>

                        {loadingProductReview && <Loader/>}

                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating' className="my-2">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control 
                                        as='select' v
                                        alue={rating} 
                                        onChange={(e) => setRating(Number(e.target.value))}>
                                    
                                    <option value="">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>

                                    </Form.Control>

                                </Form.Group>

                                <Form.Group controlId="comment" className="my-2">

                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control 
                                        as='textarea'
                                        row='3'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}>
                                    </Form.Control>

                                    <Button 
                                        disabled={loadingProductReview}
                                        type='submit'
                                        varient='primary'>
                                        Submit
                                    </Button>

                                </Form.Group>

                            </Form>
                        ) : (
                            <Message> Please <Link to='/login'>sign in</Link> to write a review.</Message>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

        </Row>
        
    
        </>) 
    }

        
    </>

    )
    }

export default ProductScreen