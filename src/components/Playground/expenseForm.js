import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { combineValidators,
  isRequired,
} from 'revalidate';
import { createExpense } from './expenseActions';
import TextInput from '../Forms/TextInput';


const mapState = (state, ownProps) => {
  let expense = {};

  return {
    initialValues: expense,
    expense,
    loading: state.asyncState.loading
  };
};

const actions = {
  createExpense
};



const validate = combineValidators({
  cost: isRequired({ message: 'The event title is required' }),
  storeName: isRequired({ message: 'Please provide a category' }),
});

class ExpenseForm extends Component {

  onFormSubmit = values => {

      this.props.createExpense(values);
      //this.props.history.push('/home');

  };

  render() {
    const { invalid, submitting, pristine, loading } = this.props;
    return (
      <Grid>

        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Expense Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="storeName"
                type="text"
                component={TextInput}
                placeholder="storeName"
              />
              <Field
                name="cost"
                type="text"
                component={TextInput}
                placeholder="cost"
              />
              <Field
                name="description"
                type="text"
                component={TextInput}
                placeholder="Tell us about your expense"
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
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(mapState, actions)(
    reduxForm({ form: 'expenseForm', enableReinitialize: true, validate })(
      ExpenseForm
    )
  )
);
