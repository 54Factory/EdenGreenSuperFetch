/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { updateSetup, cancelToggle } from '../../redux/actions/locationServices/setups/setups';
import TextInput from '../Forms/components/TextInput';
import TextArea from '../Forms/components/TextArea';
import SelectInput from '../Forms/components/SelectInput';
import DateInput from '../Forms/components/DateInput';
import PlaceInput from '../Forms/components/PlaceInput';

const mapState = (state, ownProps) => {
  let setup = {};

  if (state.firestore.ordered.oilCollectionSetup && state.firestore.ordered.oilCollectionSetup[0]) {
    setup = state.firestore.ordered.oilCollectionSetup[0];
  }

  return {
    initialValues: setup,
    loading: state.async.loading
  };
};

const actions = {
  updateSetup,
  // cancelToggle
};


const collectionContainerOptions = [
  { key: '0', text: '55 Gallon Drum', value: "55 Gallon Drum" },
  { key: '1', text: '150 Gallon Dumpster', value: "150 Gallon Dumpster" }
]
const collectionContainerQuantityOptions = [
  { key: '0', text: '1', value: 1 },
  { key: '1', text: '2', value: 2 },
  { key: '2', text: '3', value: 3 }
]


const validate = combineValidators({
  oilCollectionContainerType: isRequired('oilCollectionContainerQuantity'),
  oilCollectionContainerQuantity: isRequired('oilCollectionContainerQuantity'),
  // description: composeValidators(
  //   isRequired({ message: 'Please enter a description' }),
  //   hasLengthGreaterThan(4)({
  //     message: 'Description needs to be at least 5 characters'
  //   })
  // )(),
  // city: isRequired('city'),
  // venue: isRequired('venue'),
  // date: isRequired('date')
});

class SetupForm extends Component {

  // async componentDidMount() {
  //   const {firestore, match} = this.props;
  //   await firestore.setListener(`events/${match.params.id}`);
  // }

  // async componentWillUnmount() {
  //   const {firestore, match} = this.props;
  //   await firestore.unsetListener(`events/${match.params.id}`);
  // }

  // handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  // handleCitySelect = selectedCity => {
  //   geocodeByAddress(selectedCity)
  //     .then(results => getLatLng(results[0]))
  //     .then(latlng => {
  //       this.setState({
  //         cityLatLng: latlng
  //       });
  //     })
  //     .then(() => {
  //       this.props.change('city', selectedCity);
  //     });
  // };

  // handleVenueSelect = selectedVenue => {
  //   geocodeByAddress(selectedVenue)
  //     .then(results => getLatLng(results[0]))
  //     .then(latlng => {
  //       this.setState({
  //         venueLatLng: latlng
  //       });
  //     })
  //     .then(() => {
  //       this.props.change('venue', selectedVenue);
  //     });
  // };

  onFormSubmit = values => {
    if (this.props.initialValues.id) {
      // if (Object.keys(values.venueLatLng).length === 0) {
      //   values.venueLatLng = this.props.event.venueLatLng
      // }
      this.props.updateSetup(values);
      //this.props.history.goBack();
    } else {
      this.props.history.push('/error');
    }
  };

  render() {
    const { invalid, submitting, pristine, loading } = this.props;
    console.log(this.props.initialValues);
    
    return (

          <Segment>
            <Header sub content="Set Up Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
            <Field
             label="Container Type"
                name="oilCollectionContainerType"
                component={SelectInput}
                options={collectionContainerOptions}
                placeholder="Container Type"
              />
             <Field
             label="Container Type"
                name="oilCollectionContainerQuantity"
                component={SelectInput}
                options={collectionContainerQuantityOptions}
                placeholder="Container Quantity"
              />
              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Segment>

    );
  }
}

export default withFirestore(
  connect(mapState, actions)(
    reduxForm({ form: 'setupForm', enableReinitialize: true, validate })(
      SetupForm
    )
  )
);
