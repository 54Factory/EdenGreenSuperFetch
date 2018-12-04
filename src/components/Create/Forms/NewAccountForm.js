import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Segment, Form, Button, Container, Header } from 'semantic-ui-react';
import {
  combineValidators,
  isRequired,
} from 'revalidate';
import TextInput from './components/TextInput';
import PlaceInput from './components/PlaceInput';
import { createNewAccount } from '../../../redux/actions/create'
import SingleMarkerMapComponent from '../../Maps/SingleMarkerMap';



const mapState = (state, ownProps) => {
  let location = {};

  return {
    initialValues: location,
    location,
    ownProps
  };
};

const actions = {
  createNewAccount
};

const validate = combineValidators({
  firstName: isRequired('firstName'),
  lastName: isRequired('lastName'),
  locationName: isRequired('locationName'),
  address: isRequired('address'),
});

class NewAccountForm extends Component {
  state = {
    locationLatLng: {},
    geocodeResults: null,
    loading: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handlePlaceSelect = selectedPlace => {
    geocodeByAddress(selectedPlace)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          locationLatLng: latlng,
          geocodeResults: this.renderGeocodeSuccess(latlng.lat, latlng.lng),
        });
      })
    geocodeByAddress(selectedPlace)
      .then(results => {
        let address = results[0].formatted_address
        this.props.change('address', address);
      })
      .then(() => {
        this.props.change('locationName', selectedPlace.split(',')[0]);
        //this.props.change('city', address);
      })
      .catch(error => {
        console.log('Geocode Error', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false,
        })
      })
  };
  
  onFormSubmit = values => {
    values.locationLatLng = this.state.locationLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.locationLatLng).length === 0) {
        values.locationLatLng = this.props.location.locationLatLng
      }
        console.log('Problem');
        
    } else {
      this.props.createNewAccount(values);
      console.log('Submitted'); 
      this.props.history.push('/dashboard');
    }
  };
  renderGeocodeFailure(error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {error}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    const markers = {
      lat,
      lng
    }
    return (
      <div>
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude, continue with creating account.{' '}
        <SingleMarkerMapComponent 
          markers={markers}
        />
        <strong>
          {lat}, {lng}
        </strong>

      </div>   
      <div>
        </div>     
      </div>

    )
  }

  render() {
    const { invalid, submitting, pristine, loading } = this.props;
    console.log(this.props);
    
    return (
      <Container style={{margin: "20px", padding: "0px 40px 0px 40px" }}>
          <Segment>   
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Header sub color="grey" content="Location details" />
              <Field
                name="locationName"
                type="text"
                component={PlaceInput}
                placeholder="Find a location"
                onSelect={this.handlePlaceSelect}
              />
        {this.state.loading && (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        )}
        {this.state.geocodeResults && (
          <div>
            <div className="geocoding-results">{this.state.geocodeResults}</div>
            <Header sub color="grey" content="Address Details" />
            <Field
                name="address"
                type="text"
                component={TextInput}
                placeholder="Location Address"
              /> 
            <Header sub color="grey" content="Ownership Details" />
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
              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button disabled={loading} type="button">
                Cancel
              </Button>
              {/* {event.id &&
              <Button

                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type='button'
                color={event.cancelled ? 'green' : 'red'}
                floated='right'
                content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />} */}
          </div>
          
        )}

            </Form>
          </Segment>
      </Container>
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