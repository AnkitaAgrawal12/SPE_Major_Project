import React from 'react';
import NavbarComponent from '../Components/NavbarComponent';
import Container from 'react-bootstrap/Container';
import Footer from '../Components/Footer';
export default function BlogPage() {
  return ( 
    <div className="flex-container">
    <Container>
    <NavbarComponent />
      
      <div className="row justify-content-center mt-5" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.3',
        textAlign: 'center' // Align everything to center
      }}>
        <div className="col-md-10">
          <div className="text-center">
            <h1 className="mb-3">Sample Blog Title</h1>
            <p className="text" style={{ marginTop: '2px' }}>by John Doe</p>
            <img
              src="https://source.unsplash.com/random?wallpapers"
              alt="Blog Logo"
              className="container mb-6"
              style={{ width: '1200px', height: '600px' }}
            />
          </div>
          <p className="text" style={{ marginTop: '20px', fontSize: '1.2rem', textAlign: 'left' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec magna vitae risus sodales fermentum.
            Nulla facilisi. Nullam ac augue ac justo malesuada auctor. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia Curae; Aliquam vel nibh ac ante consectetur interdum nec non odio.
            Fusce feugiat augue sit amet semper vestibulum. Morbi luctus vehicula lectus eget consectetur.
            Fusce vulputate sapien ac consequat malesuada. Nullam pharetra erat eget libero faucibus bibendum.
            Cras quis purus nec diam auctor hendrerit vel sit amet ipsum.
          </p>
          <p className="text" style={{ marginTop: '20px', fontSize: '1.2rem', textAlign: 'left' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec magna vitae risus sodales fermentum.
            Nulla facilisi. Nullam ac augue ac justo malesuada auctor. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia Curae; Aliquam vel nibh ac ante consectetur interdum nec non odio.
            Fusce feugiat augue sit amet semper vestibulum. Morbi luctus vehicula lectus eget consectetur.
            Fusce vulputate sapien ac consequat malesuada. Nullam pharetra erat eget libero faucibus bibendum.
            Cras quis purus nec diam auctor hendrerit vel sit amet ipsum.
          </p>
        </div>
      </div>
      </Container>
      <Footer/>
    </div>
  );
}
