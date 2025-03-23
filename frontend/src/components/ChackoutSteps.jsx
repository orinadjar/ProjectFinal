
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import '../assets/styles/ChackoutSteps.css';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { step: step1, label: 'Sign In', link: '/login', icon: 'bi-person-circle' },
    { step: step2, label: 'Shipping', link: '/shipping', icon: 'bi-truck' },
    { step: step3, label: 'Payment', link: '/payment', icon: 'bi-credit-card' },
    { step: step4, label: 'Place Order', link: '/placeorder', icon: 'bi-check-circle' },
  ];

  return (
    <div className="checkout-progress-container">

      <Nav className="checkout-steps-wrapper">

        {steps.map((item, index) => (

          <div className="checkout-step-item" key={index}>

            {item.step ? (

              <LinkContainer to={item.link}>

                <Nav.Link className="step-content active-step">
                  <div className="step-circle">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <span className="step-label">{item.label}</span>
                </Nav.Link>

              </LinkContainer>
            ) : (
              <Nav.Link disabled className="step-content disabled-step">

                <div className="step-circle">
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <span className="step-label">{item.label}</span>

              </Nav.Link>
            )}

            {index < steps.length - 1 && <div className="step-connector-wrapper">
              <div className="step-connector"></div>
            </div>}

          </div>

        ))}
        
      </Nav>
      
    </div>
  );
};

export default CheckoutSteps;