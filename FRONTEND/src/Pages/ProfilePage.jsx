import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import profile from '../Images/profile.jpg';
import NavbarComponent from '../Components/NavbarComponent';
import Footer from '../Components/Footer';
import axios from 'axios';

export default function ProfilePage() {
  // State variables for profile information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [editableAbout, setEditableAbout] = useState(false);

  // Function to handle changing the about section
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  // Function to handle saving the changed about section
  const handleSaveAbout = () => {
    // Here you can add code to save the changed about section to the backend
    setEditableAbout(true); // Disable editing mode
  };

  useEffect(() => {
    // Fetch profile data from the backend when the component mounts
    axios.get('your_backend_api_url/profile')
      .then(response => {
        const { name, email, password, about } = response.data;
        setName(name);
        setEmail(email);
        setPassword(password);
        setAbout(about);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []); // Empty dependency array to run effect only once when component mounts

  return (
    <div className='profile-page'>
      <NavbarComponent />
      <div className='profile' style={{marginTop:'60px'}}>
      <Container>
        <Row className="mt-5" >
          <Col xs={12} md={4} className="text-center">
            {/* Profile Picture */}
            <div style={{ width: '400px', height: '400px', borderRadius: '50%', overflow: 'hidden'}}>
              <div
                className="profile-image"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${profile})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          </Col>
          <Col xs={12} md={8} className="align-self-start">
            <div className='card-body' style={{height:'600px'}}>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={name} readOnly />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} readOnly />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} readOnly />
                </Form.Group>
                <Form.Group controlId="formAbout">
                  <Form.Label>About me</Form.Label>
                  {editableAbout ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={about}
                      onChange={handleAboutChange}
                    />
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={about}
                      readOnly
                    />
                  )}
                </Form.Group>
                <div className='button' style={{marginTop:'5px'}}>
                  {editableAbout ? (
                    <Button variant="dark" onClick={handleSaveAbout}>
                      Save About
                    </Button>
                  ) : (
                    <Button variant="dark" onClick={() => setEditableAbout(true)}>
                      Change About
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
      <Footer />
    </div>
  );
}
