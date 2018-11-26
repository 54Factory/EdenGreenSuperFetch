import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
const SignedInMenu = ({routes}) => {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/assets/anonymousProfile200pxRound.png" />
      <Dropdown pointing="top left" text='{profile.displayName}'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={routes.CREATE} text="Create Event" icon="plus" />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item text="Settings" icon="settings" />
          <Dropdown.Item onClick={auth.doSignOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
