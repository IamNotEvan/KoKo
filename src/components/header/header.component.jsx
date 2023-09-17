import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { HeaderContainer, OptionsContainer, OptionLink, TitleContainer, Title, LogoContainer } from './header.styles';

import logo from '../../images/logo.png';
import './header.styles.scss';
// import {ReactComponent as Logo} from '../../images/image2vector.svg'

const Header = ({ currentUser }) => (
  <HeaderContainer>
    <TitleContainer to="/">
      <LogoContainer to="/">
        <img src={logo} className='logo' />
        {/* <Logo className='logo' /> */}
      </LogoContainer>
      <Title>Koko</Title>
    </TitleContainer>
    <OptionsContainer>
      <OptionLink to='/contact'>
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>
          SIGN IN
        </OptionLink>
      )}
    </OptionsContainer>
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);