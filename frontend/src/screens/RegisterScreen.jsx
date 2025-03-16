import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  // State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // Hooks for Redux state management and navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Using the login mutation from userApiSlice
  const [register, { isLoading }] = useRegisterMutation();
  
  // Getting user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Handling redirect after login
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // If the user is already logged in, navigate to the redirect page
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
        toast.error('Passwords do not match');
        return;
    }else{
        try {
            // Sending login request to backend
            const res = await register({ email, password, name }).unwrap();
            
            // Storing user credentials in Redux state
            dispatch(setCredentials({ ...res }));
            
            // Redirecting to the specified page
            navigate(redirect);
          } catch (err) {
            // Showing error message if login fails
            toast.error(err?.data?.message || err.error);
          }
    }

    
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {/* Login Form */}
      <Form onSubmit={submitHandler}>
        
        {/* Email Input Field */}
        <Form.Group controlId='email' className="my-3"> 
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />       
        </Form.Group>

        <Form.Group controlId='name' className="my-3"> 
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />       
        </Form.Group>

        {/* Password Input Field */}
        <Form.Group controlId='password' className="my-3"> 
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />       
        </Form.Group>

        <Form.Group controlId='password' className="my-3"> 
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder="Enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />       
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" variant="primary" className='mt-2' disabled={isLoading}>
          Sign Up
        </Button>

        {/* Show loader while waiting for API response */}
        {isLoading && <Loader />}
        
      </Form>

      {/* Redirect to Register Page if user is new */}
      <Row className="py-3">
        <Col>
          Already have an account?{' '} 
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>

    </FormContainer>
  );
};

export default RegisterScreen;
