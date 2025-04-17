import { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Table, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUser, FaShoppingBag, FaHistory, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';

const ProfileScreen = () => {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadUpdateProfile }] = useProfileMutation();
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials(res));
                toast.success("Profile updated successfully!");
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    // Calculate statistics
    const totalOrders = orders?.length || 0;
    const totalSpent = orders?.reduce((acc, order) => acc + order.totalPrice, 0) || 0;
    const completedOrders = orders?.filter(order => order.isDelivered).length || 0;

    return (
        <div className="profile-container">
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="profile-card">
                        <Card.Body className="text-center">
                            <div className="profile-avatar mb-3">
                                <FaUser size={50} />
                            </div>
                            <h3>{userInfo?.name}</h3>
                            <p className="text-muted">{userInfo?.email}</p>
                            <div className="profile-stats">
                                <div className="stat-item">
                                    <FaShoppingBag />
                                    <span>{totalOrders} Orders</span>
                                </div>
                                <div className="stat-item">
                                    <FaCheck />
                                    <span>{completedOrders} Completed</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="profile-form-card">
                        <Card.Header>
                            <h4><FaEdit className="me-2" />Edit Profile</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter new password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirm new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button 
                                    type="submit" 
                                    variant="primary" 
                                    className="w-100"
                                    disabled={loadUpdateProfile}
                                >
                                    {loadUpdateProfile ? <Loader /> : 'Update Profile'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="orders-card">
                <Card.Header>
                    <h4><FaHistory className="me-2" />Order History</h4>
                </Card.Header>
                <Card.Body>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">
                            {error?.data?.message || error.error}
                        </Message>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                
                                <tbody>
                                    {orders?.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id.substring(0, 8)}...</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>${order.totalPrice.toFixed(2)}</td>
                                            <td>
                                                <Badge 
                                                    bg={order.isDelivered ? "success" : order.isPaid ? "warning" : "danger"}
                                                >
                                                    {order.isDelivered ? "Delivered" : order.isPaid ? "Processing" : "Pending"}
                                                </Badge>
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button variant="outline-primary" size="sm">
                                                        View Details
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProfileScreen;