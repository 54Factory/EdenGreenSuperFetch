
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { firebase } from '../../firebase';



const mapState = (state) => ({
  auth: state.firebase.auth,
  authUser: state.sessionState.authUser,
  profile: state.firebase.profile
})

const mapDispatchToProps = (dispatch) => ({
  onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
});

class Navigation extends Component {

  componentDidMount() {
    const { onSetAuthUser } = this.props;

    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? onSetAuthUser(authUser)
        : onSetAuthUser(null);
    });
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/')
  };

  render() {
    const { auth, profile, authUser} = this.props;
    const authenticated = authUser != null
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/anonymousProfile200px.png" alt="logo" />
            SuperFetch
          </Menu.Item>
          <Menu.Item as={NavLink} to="/dashboard" name="Dashboard" />
          <Menu.Item as={NavLink} to="/home" name="Home - Protected by auth" />     

          {authenticated &&
          <Menu.Item>
            <Button
              as={Link}
              to="/create"
              floated="right"
              positive
              inverted
              content="Create New Account"
            />
          </Menu.Item>}
          {authenticated ? (
            <SignedInMenu auth={auth} profile={profile} authUser={authUser} signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, mapDispatchToProps)(Navigation)));

