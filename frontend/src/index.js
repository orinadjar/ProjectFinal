import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

          <Route index={true} path='/' element={<HomeScreen/>}></Route>
          <Route path='/product/:id' element={<ProductScreen/>}></Route>
          <Route path='/cart' element={<CartScreen/>}></Route>
          <Route path='/login' element={<LoginScreen/>}></Route>
          <Route path='/register' element={<RegisterScreen/>}></Route>
          <Route path='/shipping' element={<ShippingScreen/>}></Route>

    </Route>
  )
);
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


reportWebVitals(); // used to measure and repport performance metrics of the react app
