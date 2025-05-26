import { LinkContainer } from "react-router-bootstrap"; 
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetAllProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice"
import { toast } from "react-toastify";

const ProductListScreen = () => {

    const {data: products, isLoading, error, refetch} = useGetAllProductsQuery();
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (Pid) => {
        if(window.confirm('Are you sure you want to delete this product?'))
            try {
                await deleteProduct(Pid);
                toast.success("Item delited!");
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
    }

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                toast.success("Item created!");
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };

    return <>
        <Row className="align-items-center">
            <Col>
                <h1>Products</h1>
            </Col>

            <Col className="text-end">
                <Button className="btn-block btn-sm m-3" onClick={createProductHandler}>
                    <FaEdit/> Create Product
                </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader/>}
        {loadingDelete && <Loader/>}

        { isLoading ? <Loader/> : error ? <Message variant='danger'/> : (
        <>
            <Table striped hover responsive className="tble-sm">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}$</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant="light" className="btn-sm mx-2">
                                        <FaEdit/>
                                    </Button>
                                </LinkContainer>

                                <Button variant="danger" className="bn-sm" size="sm"
                                onClick={ () => deleteHandler(product._id)}> <FaTrash style={{color: "white"}}/> </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </Table>
        </>
        )}
    </>
}

export default ProductListScreen