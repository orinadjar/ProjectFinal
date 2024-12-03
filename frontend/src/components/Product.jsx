import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating';
const Product = ({ product }) => {
  return (

    <Card className='my-3 p-3 rounded product-card'>

        <Link to={`/product/${product._id}`} className="product-image-link">

            <div className="product-image-container">

                <Card.Img src={product.image} variant='top' className="product-image"></Card.Img>
                
                <div className="image-overlay">
                    <span className="overlay-text">View Product</span>
                </div>

            </div>
        </Link>

        <Card.Body>
            
            <Link to={`/product/${product._id}`} className="text-decoration-none">

                <Card.Title as="div" className='product-title'>
                    <strong>{product.name}</strong>
                </Card.Title>

            </Link>

            <Card.Text as='div'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </Card.Text>

            <Card.Text as="h3" >
                ${product.price}
            </Card.Text>

        </Card.Body>


    </Card>

  )
}

export default Product