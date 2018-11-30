import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import PlacesSingleMarkerMapComponent from '../../Maps/SingleMarkerMap';
import NewAccountForm from './NewAccountForm';




const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <i className="fa fa-map-marker Demo__suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
)

const cssClasses = {
  root: 'form-group',
  input: 'Demo__search-input',
  autocompleteContainer: 'Demo__autocomplete-container',
}

const shouldFetchSuggestions = ({ value }) => value.length > 2

const onError = (status, clearSuggestions) => {
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  )
  clearSuggestions()
}

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      locationName: '',
      locationLatLng: {},
      addressDetails: null,
      placeId: null,
      geocodeResults: null,
      loading: false,
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSelect(address) {
    console.log(address);   
    let locationName = address.split(',')[0];
    console.log(locationName);
    this.setState({
      address: locationName,
      locationName,
      loading: true,
    })

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          locationLatLng: {lat, lng},
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false,
        })
      })
      .then(geocodeByAddress(address)

        .then((result) => {
          this.setState({ addressDetails: result[0].formatted_address}) 
        }))
      .catch(error => {
        console.log('Geocode Error', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false,
        })
      })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    })
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
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
        <PlacesSingleMarkerMapComponent 
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
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        console.log('Blur event!')
      },
      onFocus: () => {
        console.log('Focused!')
      },
      autoFocus: true,
      placeholder: 'Search Places',
      name: 'Demo__input',
      id: 'my-input-id',
    }
    console.log(this.state);
    
    return (
      <div> 
        <PlacesAutocomplete
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          classNames={cssClasses}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          onError={onError}
          shouldFetchSuggestions={shouldFetchSuggestions}
        />
        {this.state.loading && (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        )}
        {this.state.geocodeResults && (
          <div>
            <div className="geocoding-results">{this.state.geocodeResults}</div>
            <div><NewAccountForm locationName={this.state.address} address={this.state.addressDetails} locationLatLng={this.state.locationLatLng} /></div>
          </div>
          
        )}
      </div>
    )
  }
}

export default SearchBar
