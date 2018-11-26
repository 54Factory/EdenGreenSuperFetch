import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr'
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../Auth/SignUp';
import SignInPage from '../Auth/SignIn';
import PasswordForgetPage from '../Auth/PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import withAuthentication from '../Auth/Session/withAuthentication';
import Customers from '../Customers';
import CreateCustomer from '../Create';
import Playground from '../Playground';
import Dashboard from '../Dashboard';
import * as routes from '../../constants/routes';
import ScrollToTop from '../../helpers/ScrollToTop';
import { Container } from 'semantic-ui-react';

import './index.css';


const App = () =>
  <Router>
    <ScrollToTop>
      <div className="app">
        <Navigation />
        <Container className='main'>
          <ReduxToastr
                position='bottom-right'
                transitionIn='fadeIn'
                transitionOut='fadeOut' 
              />
          <hr/>
            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
            <Route exact path={routes.HOME} component={() => <HomePage />} />
            <Route exact path={routes.DASHBOARD} component={() => <Dashboard />} />
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
            <Route exact path={routes.CUSTOMERS} component={() => <Customers />} />
            <Route exact path={routes.CREATE} component={() => <CreateCustomer />} />
            <Route exact path={routes.PLAYGROUND} component={() => <Playground />} />
          <hr/>          
        </Container>

      </div>      
    </ScrollToTop>
  </Router>

export default withAuthentication(App);