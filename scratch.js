import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  combineValidators,
  isRequired,
} from 'revalidate';
import TextInput from './components/TextInput';
import { createNewAccount } from '../../../redux/actions/create'

const mapState = (state, ownProps) => {
  let location = {};

  return {
    initialValues: ownProps,
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
  address: isRequired('address'),
  // venue: isRequired('venue'),
});

class NewAccountForm extends Component {
  state = {
    address: {},
    cityLatLng: {},
    locationLatLng: {},
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleAddressSelect = selectedAddress => {
    geocodeByAddress(selectedAddress)
    .then((result) => {
      this.setState({ address: result[0].formatted_address}) 
    })
    geocodeByAddress(selectedAddress)
    .then(results => geocodeByPlaceId(results[0].place_id))
    .then(latlng => {
      this.setState({
        locationLatLng: latlng
      });
    })
    .then(() => {
      this.props.change('address', selectedAddress)
    })
    .catch((error) => {
      console.log('Oh no!', error)
      // this.setState({
      //   geocodeResults: this.renderGeocodeFailure(error),
      //   loading: false
      // })
    })
  }

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
          locationLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue);
      });
  };


  onFormSubmit = values => {
    values.locationLatLng = this.state.locationLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.locationLatLng).length === 0) {
        values.locationLatLng = this.props.locationLatLng
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
    // console.log('From Form',this.props);
    console.log(this.state)
    return (
      <Grid>
        {/* <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZWvcf7KHmOWX5EfFqZWkhl9pJw2GtiKk&libraries=places"
          onLoad={this.handleScriptLoaded}
        /> */}
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
                name="address"
                type="text"
                component={TextInput}
                placeholder="Address"
              />      
              {/* <Field
                name="address"
                type="text"
                component={PlaceInput}
                options={{ types: ['establishment'] }}
                placeholder="Find Place...."
                onSelect={this.handleAddressSelect}
              />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                //options={{ types: ['(cities)'] }}
                placeholder="Event city"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  // options={{
                  //   location: new google.maps.LatLng(this.state.cityLatLng),
                  //   radius: 1000,
                  //   types: ['establishment']
                  // }}
                  placeholder="Event venue"
                  onSelect={this.handleVenueSelect}
                />
              )} */}
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



// import React, { Component } from 'react'
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
// import PlacesSingleMarkerMapComponent from '../../Maps/SingleMarkerMap';
// import NewAccountForm from './NewAccountForm';




// const renderSuggestion = ({ formattedSuggestion }) => (
//   <div className="Demo__suggestion-item">
//     <i className="fa fa-map-marker Demo__suggestion-icon" />
//     <strong>{formattedSuggestion.mainText}</strong>{' '}
//     <small className="text-muted">{formattedSuggestion.secondaryText}</small>
//   </div>
// )

// const cssClasses = {
//   root: 'form-group',
//   input: 'Demo__search-input',
//   autocompleteContainer: 'Demo__autocomplete-container',
// }

// const shouldFetchSuggestions = ({ value }) => value.length > 2

// const onError = (status, clearSuggestions) => {
//   console.log(
//     'Error happened while fetching suggestions from Google Maps API',
//     status
//   )
//   clearSuggestions()
// }

// class SearchBar extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       address: '',
//       locationName: '',
//       locationLatLng: {},
//       addressDetails: null,
//       placeId: null,
//       geocodeResults: null,
//       loading: false,
//     }

//     this.handleSelect = this.handleSelect.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//   }

//   handleSelect(address) {
//     console.log(address);   
//     let locationName = address.split(',')[0];
//     console.log(locationName);
//     this.setState({
//       address: locationName,
//       locationName,
//       loading: true,
//     })

//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(({ lat, lng }) => {
//         this.setState({
//           locationLatLng: {lat, lng},
//           geocodeResults: this.renderGeocodeSuccess(lat, lng),
//           loading: false,
//         })
//       })
//       .then(geocodeByAddress(address)

//         .then((result) => {
//           this.setState({ addressDetails: result[0].formatted_address}) 
//         }))
//       .catch(error => {
//         console.log('Geocode Error', error)
//         this.setState({
//           geocodeResults: this.renderGeocodeFailure(error),
//           loading: false,
//         })
//       })
//   }

//   handleChange(address) {
//     this.setState({
//       address,
//       geocodeResults: null,
//     })
//   }

//   renderGeocodeFailure(err) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         <strong>Error!</strong> {err}
//       </div>
//     )
//   }

//   renderGeocodeSuccess(lat, lng) {
//     const markers = {
//       lat,
//       lng
//     }
//     return (
//       <div>
//       <div className="alert alert-success" role="alert">
//         <strong>Success!</strong> Geocoder found latitude and longitude, continue with creating account.{' '}
//         <PlacesSingleMarkerMapComponent 
//           markers={markers}
//         />
//         <strong>
//           {lat}, {lng}
//         </strong>

//       </div>   
//       <div>
//         </div>     
//       </div>

//     )
//   }
//   render() {
//     const inputProps = {
//       type: 'text',
//       value: this.state.address,
//       onChange: this.handleChange,
//       onBlur: () => {
//         console.log('Blur event!')
//       },
//       onFocus: () => {
//         console.log('Focused!')
//       },
//       autoFocus: true,
//       placeholder: 'Search Places',
//       name: 'Demo__input',
//       id: 'my-input-id',
//     }
//     console.log(this.state);
    
//     return (
//       <div> 
//         <PlacesAutocomplete
//           renderSuggestion={renderSuggestion}
//           inputProps={inputProps}
//           classNames={cssClasses}
//           onSelect={this.handleSelect}
//           onEnterKeyDown={this.handleSelect}
//           onError={onError}
//           shouldFetchSuggestions={shouldFetchSuggestions}
//         />
//         {this.state.loading && (
//           <div>
//             <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
//           </div>
//         )}
//         {this.state.geocodeResults && (
//           <div>
//             <div className="geocoding-results">{this.state.geocodeResults}</div>
//             <div><NewAccountForm locationName={this.state.address} address={this.state.addressDetails} locationLatLng={this.state.locationLatLng} /></div>
//           </div>
          
//         )}
//       </div>
//     )
//   }
// }

// export default SearchBar
