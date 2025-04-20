import { LinkContainer } from "react-router-bootstrap";
import { Table , Button } from "react-bootstrap";
import { FaTimes, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetUsersQuery } from "../../slices/usersApiSlice"



const OrderListScreen = () => {

  const { data: users, isLoading, error } = useGetUsersQuery();

  return <>

    <h1>Users</h1>
    { isLoading ? <Loader/> : error ? <Message variant='danger'> {error} </Message> :
      (
        <Table hover classname='orders-table'>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>IsAdmin</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

                <td>{user._id}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  { user.isAdmin ? (
                    <FaCheck style={{color: 'green'}}/>
                  ) : (
                    <FaTimes style={{color: 'red'}}/>
                  ) }
                </td>

                <td>
                  <LinkContainer to={`/profile/${user._id}`}>
                    <Button variant="outline-primary" size="sm">Details</Button>
                  </LinkContainer>
                </td>
                

              </tr>

            ))}


          </tbody>

        </Table>
      )
    }


  </>
    
  
}

export default OrderListScreen
