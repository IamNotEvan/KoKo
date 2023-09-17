import React from 'react';

import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles';
import { Button } from '@mui/material';

const HomePage = () => (
  <HomePageContainer>
    <section className="hero-image">
      <h1 className="welcome-text">
        <div>Welcome to Koko!</div>
      </h1>
      <Button href="/signin" className="cta-button button" variant='contained' to='/signin'>Start Learning!</Button>
    </section>
  </HomePageContainer>
);

export default HomePage;
