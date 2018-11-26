import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Container } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu'
//import SignOutButton from '../Auth/SignOut';
import * as routes from '../../constants/routes';
import SignedOutMenu from './SignedOutMenu';

const Navigation = ({ authUser }) =>
<Menu inverted fixed="top">
<Container>
  <Menu.Item as={Link} to="/" header>
    {/* <img src="/assets/anonymousProfile200px.png" alt="logo" /> */}
    SuperFetch
  </Menu.Item>
  <Menu.Item as={Link} to="/home" name="Home" />
  {authUser &&
  <Menu.Item as={Link} to="/customers" name="Customers" />}

  {authUser ? (
    <SignedInMenu routes={routes} />
  ) : (
    <SignedOutMenu />
  )}
</Container>
</Menu>
  // <div>
  //   { authUser
  //       ? <SignedInMenu routes={routes} />
  //       : <NavigationNonAuth />
  //   }
  // </div>



// const NavigationAuth = () =>
//   <ul>
//     <li><Link to={routes.LANDING}>Landing</Link></li>
//     <li><Link to={routes.HOME}>Home</Link></li>
//     <li><Link to={routes.ACCOUNT}>Account</Link></li>
//     <li><Link to={routes.CUSTOMERS}>Customers</Link></li>
//     <li><Link to={routes.CREATE}>Create</Link></li>
//     <li><SignOutButton /></li>
//   </ul>

// const NavigationNonAuth = () =>
//   <ul>
//     <li><Link to={routes.LANDING}>Landing</Link></li>
//     <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
//   </ul>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
