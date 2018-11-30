import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';

const styles = {
  autocompleteContainer: {
    zIndex: 1000
  }
}

// Log error status and clear dropdown when Google Maps API returns an error.
const onError = (status, clearSuggestions) => {
  console.log('Google Maps API returned error with status: ', status)
  clearSuggestions()
}

  //  const autoCompleteItem = ({ formattedSuggestion }) => (
  //     <div className="Demo__suggestion-item">
  //       <i className='fa fa-map-marker Demo__suggestion-icon'/>
  //       <strong>{formattedSuggestion.mainText}</strong>{' '}
  //       {/* <small className="text-muted">{formattedSuggestion.secondaryText}</small> */}
  //     </div>)

  //   const inputProps = {
  //     type: "text",
  //     value: this.state.address,
  //     onChange: this.handleChange,
  //     onBlur: () => { console.log('Blur event!'); },
  //     onFocus: () => { console.log('Focused!'); },
  //     autoFocus: true,
  //     placeholder: "Search Places",
  //     name: 'Demo__input',
  //     id: "my-input-id",
  //   }


class PlaceInput extends Component {
  state = {
    scriptLoaded: false
  };

  
  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  render() {
    const {
      input,
      width,
      onSelect,
      placeholder,
      options,
      autoCompleteItem,
      meta: { touched, error }
    } = this.props;
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZWvcf7KHmOWX5EfFqZWkhl9pJw2GtiKk&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            inputProps={{ ...input, placeholder }}
            autoCompleteItem={autoCompleteItem}
            onEnterKeyDown={onSelect}
            options={options}
            onSelect={onSelect}
            styles={styles}
            onError={onError}
          />
        )}
        {touched &&
          error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
      </Form.Field>
    );
  }
}

export default PlaceInput;
