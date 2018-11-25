import React from 'react'
import { Form } from 'semantic-ui-react'

export default class LocationForm extends React.Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    // const { addressValues } = this.props
    // const otherAttributes = [
    //   { title: 'City', value: 'city', type: 'city' },
    //   { title: 'State', value: 'state', type: 'state' },
    //   { title: 'Zip', value: 'zip', type: 'zip' }
    // ];
    // const extraInfos = [];
    // otherAttributes.forEach(attribute => {
    //   const value = addressValues[attribute.value];
    //   if (value) {
    //     extraInfos.push(
    //       <div key={attribute.value}>
    //         <p>{`${attribute.title}`}</p>
    //         <p>
    //           {value}
    //         </p>
    //       </div>
    //     );
    //   }
    // });
    return (

          <div>
            <p>Location Name</p>
            <Form.Input 
              placeholder='Location Name'
              style={{ marginBottom: '15px' }} 
              name="locationName"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>

    );
  }
}
