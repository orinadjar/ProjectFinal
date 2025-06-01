import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"  
import Loader from "./Loader"
import Message from "./Message"
import { useGetTopRatedProductsQuery } from "../slices/productsApiSlice"


const ProductCarousel = () => {

    const { data: products, isLoading, error } =  useGetTopRatedProductsQuery();

    return (
        isLoading ? <Loader></Loader> : error ? <Message variant='danger'>{ error?.data?.message || error.error }</Message>
        : (
            <Carousel pause='hover' className="modern-product-carousel">
                {products.map(product => (
                    <Carousel.Item key={product._id} className="carousel-item-modern">
                        <Link to={`/product/${product._id}`} className="carousel-link-modern">
                            <Image src={product.image} alt={product.name} fluid className="carousel-image-modern"></Image>
                            <Carousel.Caption className="carousel-caption-modern">
                                <h2 className="carousel-title-modern mb-4">{product.name} (${product.price})</h2>
                            </Carousel.Caption>


                            
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel
