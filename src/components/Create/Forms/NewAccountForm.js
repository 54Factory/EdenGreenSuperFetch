/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  combineValidators,
  isRequired,
} from 'revalidate';
import TextInput from './components/TextInput';
import PlaceInput from './components/PlaceInput';
import { createNewAccount } from '../../../redux/actions/create'

const mapState = (state, ownProps) => {
  let location = {};

  return {
    initialValues: location,
    location,
  };
};

const actions = {
  createNewAccount
};

const validate = combineValidators({
  //displayName: isRequired('displayName'),
  firstName: isRequired('firstName'),
  lastName: isRequired('lastName'),
  locationName: isRequired('locationName'),
  city: isRequired('city'),
  venue: isRequired('venue'),
});

class NewAccountForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue);
      });
  };


  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.location.venueLatLng
      }
        console.log('Problem');
        
    } else {
      this.props.createNewAccount(values);
      console.log('Submitted');
      
      // this.props.history.push('/');
    }
  };

  render() {
    const { invalid, submitting, pristine, loading } = this.props;
    console.log(this.props);
    
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZWvcf7KHmOWX5EfFqZWkhl9pJw2GtiKk&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Ownership Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              {/* <Field
                name="displayName"
                type="text"
                component={TextInput}
                placeholder="Username"
              /> */}
              <Field
                name="firstName"
                type="text"
                component={TextInput}
                placeholder="First Name"
              />
              <Field
                name="lastName"
                type="text"
                component={TextInput}
                placeholder="Last Name"
              />
              <Header sub color="teal" content="Location details" />
              <Field
                name="locationName"
                type="text"
                component={TextInput}
                placeholder="Location Name"
              />      
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ['(cities)'] }}
                placeholder="Event city"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment']
                  }}
                  placeholder="Event venue"
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              {/* <Button disabled={loading} onClick={this.props.history} type="button">
                Cancel
              </Button> */}
              {/* {event.id &&
              <Button

                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type='button'
                color={event.cancelled ? 'green' : 'red'}
                floated='right'
                content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />} */}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

}

export default withFirestore(
  connect(mapState, actions)(
    reduxForm({ form: 'newAccountForm', enableReinitialize: true, validate })(
      NewAccountForm
    )
  )
);