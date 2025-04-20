import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center py-4" style={{ backgroundColor: "#fff" }}>
      <Container>

        <Row className="justify-content-center mb-3">
          <Col md="auto">
            <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
              ORIginal &copy; {currentYear}
            </p>
            <p style={{ color: '#856404', backgroundColor: '#fff3cd', padding: '8px', borderRadius: '6px', fontSize: '0.8rem' }}>
                ⚠️ This is a prototype website! Functionality may be limited.
            </p>

          </Col>
        </Row>

        <Row className="justify-content-center align-items-center" style={{ gap: '40px' }}>
          <Col xs="auto" className="d-flex align-items-center">
            <img
              src="/images/ori_logo.png"
              alt="Ori Nadjar"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid white",
              }}
            />
            <span style={{ marginLeft: "12px", fontWeight: "500" }}>Ori Nadjar <h5 style={{fontSize: "10px"}}>Developer</h5></span>

          </Col>

          <Col xs="auto" className="d-flex align-items-center">
            <img
              src="/images/kay_logo.png"
              alt="Kay the Dog"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid white",
              }}
            />
            <span style={{ marginLeft: "12px", fontWeight: "500" }}>Kay Nadjar<h5 style={{fontSize: "10px"}}>CEO</h5></span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
