import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormLabel } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../slices/usersApiSlice";

const UserEditScreen = () => {

    const { id: userId } = useParams();
    const [name, SetName] = useState('');
    const [email, Setemail] = useState('');
    const [isAdmin, SetisAdmin] = useState(0);

    const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

    const [updateUser, {isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            SetName(user.name);
            Setemail(user.email);
            SetisAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('User updated');
            navigate('/admin/userslist');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }


    return (
        <>
            <Link to="/admin/userslist" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader></Loader>}
                {isLoading ? <Loader /> : error ? <Message variant='danger'>  { error?.data?.message || error.error } </Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder="Enter Name" value={name} onChange={(e) => SetName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder="Enter Email" value={email} onChange={(e) => Setemail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin' className="my-2">
                            <Form.Label>Is an admin</Form.Label>
                            <Form.Check type='checkbox' label="is Admin" checked={isAdmin} onChange={(e) => SetisAdmin(e.target.checked)}>
                            </Form.Check>
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

export default UserEditScreen;
