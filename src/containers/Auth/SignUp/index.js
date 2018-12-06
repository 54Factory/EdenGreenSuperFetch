import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../../../firebase';
import * as routes from '../../../constants/routes';
import { Form } from 'semantic-ui-react'

const options = [
  { key: 'a', text: 'Admin', value: 'Admin' },
  { key: 'd', text: 'Driver', value: 'Driver' },
]


const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  role: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }

  onChange = (e, data) => {
    console.log(data.value);
    this.setState({ role: data.value });
  }

  onSubmit = (event) => {
    const {
      firstName,
      lastName,
      username,
      email,
      role,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log(authUser);
        db.doCreateFirestoreUser(authUser, firstName, lastName, username, email, role)
        db.updateFirebaseUserProfile(authUser, authUser.uid, firstName, lastName, username, email, role)
        // Create a user in your own accessible Firebase Database too
        //db.doCreateUser(authUser.user.uid, firstName, lastName, username, email, role)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push('/dashboard');
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      role,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
console.log(this.state);

    const isInvalid =
      firstName === '' ||
      lastName === '' ||
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      role === '' ||
      email === '';

    return (
        <Form onSubmit={this.onSubmit}>
          <Form.Group widths='equal'>
            <Form.Select 
              fluid
              label='User Type' 
              options={options} 
              placeholder='User Type' 
              value={role}
              onChange={this.onChange}
            />
            <Form.Input 
              fluid 
              label='First name' 
              placeholder='First name'
              value={firstName}
              onChange={event => this.setState(updateByPropertyName('firstName', event.target.value))}
              type="text"
              name="firstName" 
            />
            <Form.Input 
              fluid 
              label='Last name' 
              placeholder='Last name'
              value={lastName}
              onChange={event => this.setState(updateByPropertyName('lastName', event.target.value))}
              type="text"
              name="lastName" 
            />
            <Form.Input 
              fluid 
              label='Email' 
              placeholder='Email'
              value={email}
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              type="text"
              name="email" 
            />
          </Form.Group>
          <Form.Group widths='equal'>        
            <Form.Input 
              fluid 
              label='Username' 
              placeholder='Username'
              value={username}
              onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
              type="text"
              name="username" 
            />
              <Form.Input 
              fluid 
              label='Password' 
              placeholder='Password'
              value={passwordOne}
              onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
              type="password"
              name="passwordOne" 
            />
              <Form.Input 
              fluid 
              label='Confirm Password' 
              placeholder='Confirm Password'
              value={passwordTwo}
              onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
              type="password"
              name="passwordTwo" 
            />
          </Form.Group>
        <Form.Button disabled={isInvalid}>Submit</Form.Button>
        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
