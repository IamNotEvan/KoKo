import React from 'react';

import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';
import { TextField, Button } from '@mui/material';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }

  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return(
      <div className='sign-in'>
        <h2 className='title'>Sign In</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit} className='sign-in-form'>
          <TextField 
            id="email"
            variant="standard" 
            name='email' 
            type='email' 
            onChange={this.handleChange}
            value={this.state.email} 
            label='Email'
            required 
          />
          <TextField 
            id="password"
            variant="standard"
            name='password' 
            type='password' 
            onChange={this.handleChange}
            value={this.state.password} 
            label='Password'
            required 
          />
          <div className='buttons'>
            <Button type='submit' variant='contained'> Sign in </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;