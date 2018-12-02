import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation';
import SignUpPage from '../Auth/SignUp';
import SignInPage from '../Auth/SignIn';
import PasswordForgetPage from '../Auth/PasswordForget';
import LandingPage from '../Landing';
import HomePage from '../Home';
import AccountPage from '../Account';
import Customers from '../Customers';
import CreateCustomer from '../Create';
//import Playground from '../Playground';
import Dashboard from '../Dashboard';
import LocationDetailPage from '../Locations/LocationDetailPage';
//import withAuthentication from '../Auth/Session/withAuthentication';

import { Container } from 'semantic-ui-react';

import './index.css';
import PhotosPage from '../Users/PhotosPage';


class App extends Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>


        <Route 
          path="/(.+)"
          render={() => (
            <div className="app">
              <Navigation />
            <Container className="main">
              <Switch>
                  <Route path="/signup" component={SignUpPage} />
                  <Route path="/signin" component={SignInPage } />
                  <Route path="/pw-forget" component={PasswordForgetPage} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/home" component={HomePage} />
                  <Route path="/locations/:id" component={LocationDetailPage} />
                  <Route path="/account" component={AccountPage} />
                  <Route path="/create" component={CreateCustomer} />
                  <Route path="/customers" component={Customers} />
                  <Route path="/profile/photos/:id" component={PhotosPage} />  
                </Switch>
            </Container>               
            </div>
          )}
        />
      </div>
    )
  }
}


//export default withAuthentication(App);
export default App;