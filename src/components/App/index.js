import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navigation from '../../containers/Navigation';
import SignUpPage from '../../containers/Auth/SignUp';
import SignInPage from '../../containers/Auth/SignIn';
import PasswordForgetPage from '../../containers/Auth/PasswordForget';
import LandingPage from '../landing';
import HomePage from '../home';
import AccountPage from '../../containers/Auth/Account';
import Customers from '../../containers/Customers';
import CreateCustomer from '../../crud';
import UsersPage from '../../containers/Users'
import Dashboard from '../locations/dashboard';
import LocationDetailPage from '../locations/locationDetailPage';
import PhotosPage from '../../components/users/userPhotosPage';
import ResponsiveLayout from '../layout/responsiveLayout';
import OilCollectionPage from '../../containers/LocationServices/OilCollection';
import OilCollectionSetupPage from '../../containers/LocationServices/OilCollectionSetUp';
import OilCollectionSetUpDetails from '../../components/oilCollectionSetUp/oilCollectionSetUpDetails';

import './index.css';

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
              {/* Auth */}
                  <Route path="/signup" component={SignUpPage} />
                  <Route path="/signin" component={SignInPage } />
                  <Route path="/pw-forget" component={PasswordForgetPage} />
                  <Route path="/account" component={AccountPage} />
              {/* Home / Dashboard */}
                  <Route path="/home" component={HomePage} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/create" component={CreateCustomer} />
              {/* Locations */}
                  <Route path="/locations/:id" component={LocationDetailPage} />
              {/* OilCollection */}
                  <Route path="/oilCollectionSetup/:id" component={OilCollectionSetUpDetails} />
                  <Route path="/oilCollection" component={OilCollectionPage} />
                  <Route path="/oilCollectionSetup" component={OilCollectionSetupPage} /> 
                   
              {/* Users */}
                  <Route path="/users" component={UsersPage} /> 
                  <Route path="/profile/photos/:id" component={PhotosPage} /> 
              {/* Customers */}
                  <Route path="/customers" component={Customers} />
                  {/* Layout / Design  DEVELOPMENT  */}
                  <Route path="/layout" component={ResponsiveLayout} />  
                </Switch>
            </Container>               
            </div>
          )}
        />
      </div>
    )
  }
}

export default App;