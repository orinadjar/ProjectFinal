import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormLabel } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from "../../slices/productsApiSlice";

const ProductEditScreen = () => {

    const { id:productId } = useParams();
    const [name, SetName] = useState('');
    const [price, Setprice] = useState(0);
    const [image, Setimage] = useState('');
    const [brand, Setbrand] = useState('');
    const [category, Setcategory] = useState('');
    const [countInStock, SetCountInStock] = useState(0);
    const [description, SetDescription] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, {isLoading: loadingUpdate }] = useUpdateProductMutation();

    const [ uploadProductImage, { isLoading: loadingUpload } ] = useUploadProductImageMutation();

    const navigate = useNavigate();

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.massage);
            Setimage(res.image);
        } catch (error) {
            toast.error(error?.data?.massage || error.error);
        }
    }

    useEffect(() => {
        if(product){
            SetName(product.name);
            Setprice(product.price);
            Setimage(product.image);
            Setbrand(product.brand);
            Setcategory(product.category);
            SetCountInStock(product.countInStock);
            SetDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        };

        const result = await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error);
        }else{
            toast.success('Product updated');
            navigate('/admin/productlist')
        }
    }


    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader></Loader>}
                {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder="Enter Name" value={name} onChange={(e) => SetName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price' className="my-2">
                            <Form.Label>price</Form.Label>
                            <Form.Control type='number' placeholder="Enter Price" value={price} onChange={(e) => Setprice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image' className="my-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder="Enter image url" value={image} onChange={(e) => Setimage}>
                            </Form.Control>

                            <Form.Control type='file' lable='Choose file' onChange={ uploadFileHandler }></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand' className="my-2">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder="Enter Brand" value={brand} onChange={(e) => Setbrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category' className="my-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder="Enter Category" value={category} onChange={(e) => Setcategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='count in stock' className="my-2">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control type='number' placeholder="Enter Count in stock" value={countInStock} onChange={(e) => SetCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description' className="my-2">
                            <Form.Label>Description</Form.Label>
                            <br></br><small>{250 - description.length} characters remaining</small>
                            <Form.Control type='text' placeholder="Enter description" value={description} onChange={(e) => SetDescription(e.target.value)} maxLength={250}> 
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="btn btn-dark my-2">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </> 
    )
    
        
        
    
}

export default ProductEditScreen;
