import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SignedOutMenu = () => {
  return (
    <Menu.Item position="right">
    <Button as={Link} to={'/signin'} basic inverted content="Sign In" />
    <Button
      as={Link} to={'/signup'}
      basic
      inverted
      content="Sign Up"
      style={{ marginLeft: '0.5em' }}
    />
  </Menu.Item>
  )
}

export default SignedOutMenu
