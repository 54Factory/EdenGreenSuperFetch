import React from 'react';
import { Segment, List, Label, Item } from 'semantic-ui-react';

const LocationDetailSidebar = () => {
  const isHost = true;
  return (
    <div>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
       
      </Segment>
      <Segment attached>
        <List relaxed divided>
              <Item style={{ position: 'relative' }}>
                {isHost &&
                <Label
                  style={{ position: 'absolute' }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>}
                {/* <Item.Image size="tiny" src={attendee.photoURL}/> */}
                <Item.Content verticalAlign="middle">
                  <Item.Header>
                    <h1>Last Pickup data link?</h1>
                    {/* <a>{attendee.name}</a> */}
                  </Item.Header>
                </Item.Content>
              </Item>
            
        </List>
      </Segment>
    </div>
  );
};
// const LocationDetailSidebar = ({ attendees }) => {
//   const isHost = false;
//   return (
//     <div>
//       <Segment
//         textAlign="center"
//         style={{ border: 'none' }}
//         attached="top"
//         secondary
//         inverted
//         color="blue"
//       >
//         {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
//       </Segment>
//       <Segment attached>
//         <List relaxed divided>
//           {attendees &&
//             attendees.map(attendee => (
//               <Item key={attendee.id} style={{ position: 'relative' }}>
//                 {isHost &&
//                 <Label
//                   style={{ position: 'absolute' }}
//                   color="orange"
//                   ribbon="right"
//                 >
//                   Host
//                 </Label>}
//                 <Item.Image size="tiny" src={attendee.photoURL}/>
//                 <Item.Content verticalAlign="middle">
//                   <Item.Header as="h3">
//                     <a>{attendee.name}</a>
//                   </Item.Header>
//                 </Item.Content>
//               </Item>
//             ))}
//         </List>
//       </Segment>
//     </div>
//   );
// };

export default LocationDetailSidebar;
