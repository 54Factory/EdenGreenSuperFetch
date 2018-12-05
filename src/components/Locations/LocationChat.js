import React from 'react';
import { Segment, Header, Comment, TextArea, Form, Button } from 'semantic-ui-react';

const LocationDetailChat = () => {
  return (
    <div>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="black"
        style={{ border: 'none' }}
      >
        <Header>Location Channel</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          <Comment>
          <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">Geovannie</Comment.Author>
              <Comment.Metadata>
                <div>Today at 1:42PM</div>
              </Comment.Metadata>
              <Comment.Text>Customer wants a grease trap cleaning</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="/assets/user.png" />
                <Comment.Content>
                  <Comment.Author as="a">Aaron</Comment.Author>
                  <Comment.Metadata>
                    <div>Just now</div>
                  </Comment.Metadata>
                  <Comment.Text>Ok, I will set them up.</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>
          <Form reply>
            <TextArea autoHeight />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </div>
  );
};

export default LocationDetailChat;
