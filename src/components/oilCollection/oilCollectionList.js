import React from 'react'
import { List } from 'semantic-ui-react'

export default function OilCollectionList() {
  return (
    <List divided relaxed>
    <List.Item>
      <List.Icon name='shipping fast' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Collection Point-1</List.Header>
        <List.Description as='a'>Updated 10 mins ago</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='shipping fast' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Collection Point-2</List.Header>
        <List.Description as='a'>Updated 22 mins ago</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='shipping fast' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Collection Point-3</List.Header>
        <List.Description as='a'>Updated 34 mins ago</List.Description>
      </List.Content>
    </List.Item>
  </List>
  )
}
