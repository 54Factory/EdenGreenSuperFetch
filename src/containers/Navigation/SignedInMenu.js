import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const SignedInMenu = ({signOut, profile, auth}) => {
  
  return (
    <Menu.Item position="right">
      <Menu.Item as={Link} to="/dashboard" name="Dashboard" />   
      <Menu.Item as={Link} to="/oilCollection" name="Oil Collection" />   
      <Menu.Item as={Link} to="/oilCollectionSetup" name="Oil Collection Set Up" /> 
      <Menu.Item as={Link} to="/users" name="Users" />  
      <Menu.Item>
        <Image avatar spaced="right" src={profile.photoURL || "/assets/user.png"} />
        <Dropdown pointing="top left" text={profile.username}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} text="My Profile" icon="user" />
            <Dropdown.Item as={Link} to={`/profile/photos/${auth.uid}`} text="My Photos" icon="camera" />
            <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
            <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
          </Dropdown.Menu>
        </Dropdown>      
      </Menu.Item>  

    </Menu.Item>
  );
};

export default SignedInMenu;
