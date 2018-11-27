import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
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
  //<Menu.Item as={Link} to="/customers" name="Customers" />}
  <Menu.Item as={Link} to="/dashboard" name="Dashboard" />}
    <Menu.Item position="left">
      <Dropdown pointing="top left" text='Create'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={routes.CREATE} text="Create New Account" icon="plus" />
          <Dropdown.Item text="Create New User" icon="user" />
          <Dropdown.Item text="Create New Location" icon="map marker" />
          <Dropdown.Item text="Create New Service" icon="wrench" />
          <Dropdown.Item text="Settings" icon="settings" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item> 
  {authUser ? (
    <SignedInMenu routes={routes} profile={authUser} />
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
