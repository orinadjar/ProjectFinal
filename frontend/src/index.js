import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Provider } from 'react-redux';
import store from './store.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/placeOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

          <Route index={true} path='/' element={<HomeScreen/>}></Route>
          <Route path='/product/:id' element={<ProductScreen/>}></Route>
          <Route path='/cart' element={<CartScreen/>}></Route>
          <Route path='/login' element={<LoginScreen/>}></Route>
          <Route path='/register' element={<RegisterScreen/>}></Route>


          <Route path="" element={<PrivateRoute/>}>

            <Route path='/shipping' element={<ShippingScreen/>}></Route>
            <Route path='/payment' element={<PaymentScreen/>}></Route>
            <Route path='/placeorder' element={<PlaceOrderScreen/>}></Route>
            <Route path='/order/:id' element={<OrderScreen/>}></Route>

          </Route>

    </Route>
  )
);
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>

      <PayPalScriptProvider>

        <RouterProvider router={router}/>

      </PayPalScriptProvider>

    </Provider>

  </React.StrictMode>
);


reportWebVitals(); // used to measure and repport performance metrics of the react app
