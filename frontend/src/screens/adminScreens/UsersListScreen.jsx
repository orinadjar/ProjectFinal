import { LinkContainer } from "react-router-bootstrap";
import { Table , Button } from "react-bootstrap";
import { FaTimes, FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice"
import { toast } from "react-toastify";

const OrderListScreen = () => {

  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this user?'))
      try {
          await deleteUser(id);
          refetch();
          toast.success("User delited!");
      } catch (error) {
          toast.error(error?.data?.message || error.error);
      }
  };

  return <>

    <h1>Users</h1>
    {loadingDelete && <Loader/>}
    { isLoading ? <Loader/> : error ? <Message variant='danger'> { error?.data?.message || error.error } </Message> :
      (
        <Table hover className='orders-table'>

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
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  { user.isAdmin ? (
                    <FaCheck style={{color: 'green'}}/>
                  ) : (
                    <FaTimes style={{color: 'red'}}/>
                  ) }
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="outline-primary" size="sm"><FaEdit/></Button>
                  </LinkContainer>
                  <Button size="sm" variant='danger' classname='btn-sm' onClick={() => deleteHandler(user._id)}><FaTrash style={{color: "white"}}/></Button>
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
