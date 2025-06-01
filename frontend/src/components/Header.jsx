import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import SearchBox from './SearchBox';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo.png';
import '../assets/styles/Header.css';

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart); 
  const { userInfo } = useSelector((state) => state.auth); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const titleName = userInfo?.easterPerk === 'rainbow' ? (
    <span className="glow-name">👑 {userInfo.name} 👑</span>
  ) : (
    <span>{userInfo?.name || 'Guest'}</span>
  );

  const logoutHandler = async () => {
    try{ 
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');

    } catch(err){
        console.log(err);
    }
  }

  return (
    <header>
        <Navbar variant="dark" className="navbar-compact navbar-lightblue">

            <Container>

                <LinkContainer to='/'>
                    <Navbar.Brand >
                        <img src={logo} alt="ORIginal" style={{ maxHeight: '150px', width: '100px' }} />
                    </Navbar.Brand>
                </LinkContainer>

                <Nav className='ms-auto'>




                    <SearchBox></SearchBox>

                    <LinkContainer to='/cart'>
                        <Nav.Link> <FaShoppingCart/> Cart 
                            {
                            cartItems.length > 0 && (
                                <Badge pill bg='success' style={{marginLeft:'5px'}}>{ cartItems.reduce((a, c) => a + c.qty, 0)}</Badge>
                            )
                            }
                            </Nav.Link>
                    </LinkContainer>

                    { userInfo ? 
                    
                    (<NavDropdown title={titleName} id='username'>

                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>

                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                    </NavDropdown>) : 
                    
                    (<LinkContainer to='/login'>
                        <Nav.Link href="/login"> <FaUser/> Sign In </Nav.Link>
                    </LinkContainer>)
                    }

                    { userInfo && userInfo.isAdmin ?
                        
                        <NavDropdown title='Admin' id='adminmenu'>

                            <LinkContainer to="/admin/orderlist">
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to="/admin/productlist">
                                <NavDropdown.Item>Product</NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to="/admin/userslist">
                                <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>

                        </NavDropdown>
                        :
                        <></>
                    }
                

                </Nav>

            </Container>

        </Navbar>
    </header>
  )
}

export default Header;