//src/components/AddExpense.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import cuid from 'cuid'

class AddExpense extends Component {
  static propTypes = {
    uid: PropTypes.string,
    selectedCategory: PropTypes.string,
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  }
  state = { description: '', cost: 0, storeName: '', accountId: cuid() }
  // accountId = cuid();
  addExpense() {
    this.props.firestore.add(
      { collection: 'expenses' },
      {
        uid: this.props.uid,
        description: this.state.description,
        cost: this.state.cost,
        accountId: this.state.accountId
      }
    ).set(
      { collection: 'store' },
      {
        uid: this.props.uid,
        storeName: this.state.storeName,
        accountId: this.state.accountId
      }
    )
    this.setState({ cost: 0, description: '', storeName: '' })
  }

  render() {
    // if (!this.props.uid) return null
    // if (!this.props.selectedCategory) return null
console.log(this.state);

    return (
      <div>
        <input
          type="text"
          value={this.state.storeName}
          onChange={(evt) => this.setState({ storeName: evt.target.value })}
          placeholder='Store Name'
        />
        <input
          type="text"
          value={this.state.description}
          onChange={(evt) => this.setState({ description: evt.target.value })}
        />
        <input
          type="number"
          value={this.state.cost}
          step="0.01"
          onChange={(evt) => this.setState({ cost: evt.target.value })}
        />
        <button onClick={(evt) => this.addExpense()}>Add Expense</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    //selectedCategory: state.categories.selectedCategory
  }
}

const mapDispatchToProps = {}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(AddExpense)