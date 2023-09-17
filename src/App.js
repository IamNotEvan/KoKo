import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ProgressPage from './pages/progesspage/progresspage.component';
import LessonPage from './pages/lessonpage/lessonpage.component';
import LessonContent from './pages/lessoncontent/lessoncontent.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        (await userRef).onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
        this.setState({ loading: false });
      }
      else {
        
      setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { loading } = this.state;
    return (
      <div className='content'>
      <div>
        <Header />
        <Routes>
          <Route
            exact
            path='/'
            element={
              !loading && this.props.currentUser ? (
                <div>
                  <Navigate to='/progress' />
                  <HomePage />
                </div>
              ) : (
                <HomePage />
              )
            }
          />
          <Route 
            exact 
            path='/signin' 
            element={
              !loading && this.props.currentUser ? (
                <div>
                  <Navigate to='/progress' />  
                  <HomePage />
                </div>
              ) : (
                <div>
                  <SignInAndSignUpPage />
                </div>
              )
            }
          />
          <Route 
            exact 
            path='/progress' 
            element={
              !loading && this.props.currentUser ? (
                <div>
                  <ProgressPage/>
                </div>
              ) : (
                null
              )
            }
          />
          <Route 
            exact 
            path='/lesson/:num' 
            element={
              !loading && this.props.currentUser ? (
                <div>
                  <LessonPage />
                </div>
              ) : (
                null
              )
            }
          />
          <Route 
            exact 
            path='/lesson/:num/:lesson' 
            element={
              !loading && this.props.currentUser ? (
                <div>
                  <LessonContent />
                </div>
              ) : (
                null
              )
            }
          />
        </Routes>
      </div>
      <footer className='footer'>
        <div className='footer__list'>
          <Link className='footer__list--item' to='/contact'>Contact Us</Link>
          <Link className='footer__list--item' to='/privacy'>Privacy Policy</Link>
          <Link className='footer__list--item' to='/terms'>Terms</Link>
        </div>
        <div className="footer__copyright">
            Copyright &copy; Koko 2023.
        </div>
      </footer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);