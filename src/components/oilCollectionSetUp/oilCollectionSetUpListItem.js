// import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';

// class OilCollectionSetUpListItem extends Component {
//   render() {
//     const { setups } = this.props
//     console.log(this.props);
    
//     return (
//       <Segment.Group>

//         <Segment>
//           <List horizontal>
//           {setups.map((setup) => (
//           <List.Item key={setup.id}>
//           <List.Icon name='shipping fast' size='large' verticalAlign='middle' />
//           <List.Content>
//             <List.Header as='a'>{setup.locationName}</List.Header>
//             <List.Description as='a'>Updated 10 mins ago</List.Description>
//           </List.Content>
//         </List.Item>
//           ))}
//           <List.Item>
//             <List.Icon name='shipping fast' size='large' verticalAlign='middle' />

//           </List.Item>
//           </List>
//         </Segment>
//         <Segment clearing>
//         <Button as={Link} to={`/locations`} color="blue" floated="right" content="View" />
//         </Segment>
//       </Segment.Group>
//     );
//   }
// }

// export default OilCollectionSetUpListItem;
