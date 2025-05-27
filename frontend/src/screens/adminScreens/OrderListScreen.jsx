import { LinkContainer } from "react-router-bootstrap";
import { Table , Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice"

const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return <>

    <h1>Orders</h1>
    { isLoading ? <Loader/> : error ? <Message variant='danger'>   {error?.data?.message || error.error || 'An error occurred'} </Message> :
      (
        <Table hover classname='orders-table'>

          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th> 
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order._id}>

                <td>{order._id}</td>

                <td>{order.user && order.user.name}</td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td>{order.totalPrice}</td>

                <td>
                  { order.isPaid ? (
                    order.paidAt.substring(0,10)
                  ) : (
                    <FaTimes style={{color: 'red'}}/>
                  ) }
                </td>

                <td>
                  { order.isDelivered ? (
                    order.deliveredAt.substring(0,10)
                  ) : (
                    <FaTimes style={{color: 'red'}}/>
                  ) }
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
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
