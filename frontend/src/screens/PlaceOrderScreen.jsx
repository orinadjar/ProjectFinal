import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/ChackoutSteps";


const PlaceOrderScreen = () => {
    
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);


    useEffect(() => {
        if (!cart.shippingAddress.address){
            navigate('/shipping');
        }
        else if(!cart.PaymetMethod){
            navigate('/payment');
        }
    },[cart.shippingAddress.address, cart.PaymetMethod, navigate])


  return <>

    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

    <Row>
        
        <Col md={8}>Column</Col>
        <Col md={4}>Column</Col>

    </Row>
  
  </>
    
}

export default PlaceOrderScreen;