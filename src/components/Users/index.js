import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Grid, Header } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';

import LoadingComponent from '../../helpers/LoadingComponent';

import withAuthorization from '../Auth/Session/withAuthorization';

class UsersPage extends Component {
  componentDidMount() {
    const { onSetUsers, users } = this.props;   
      onSetUsers(users)
  }

  render() {

    const { users, loading } = this.props;
    // console.log(this.props);
    
    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={10}>
        <Header sub color="grey" content="Users" />
        <h1>Users</h1>
        <p>The Users Page is only accessible by a signed in user.</p>

        { !!users && <UserList users={users} /> }
        </Grid.Column>
        <Grid.Column width={6}>
          <h1>Side Column</h1>
        </Grid.Column>
      </Grid>
    );

  }
}

const UserList = ({ users }) =>
  <div>
    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>





const mapState = state => ({
  users: state.firestore.ordered.users,
  loading: state.async.loading
});


const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapState, mapDispatchToProps),
  firestoreConnect([{ collection: 'users' }])
)(UsersPage);

