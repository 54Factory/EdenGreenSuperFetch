import { toastr } from 'react-redux-toastr';
import moment from 'moment';



const createNewExpense = (user, expense) => {
  expense.date = moment(expense.date).toDate();
  return {
    ...expense,
    createdById: user.uid,
    userName: user.displayName,
    created: Date.now(),
    store: {
      [user.uid]: {
        storeName: expense.storeName
      }
    }
  }
}

export const createExpense = expense => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = getState().firebase.auth;
    let newExpense = createNewExpense(user, expense)
    try {
      let createdExpense = await firestore.add(`expenses`, newExpense);
      await firestore.set(`store/${createdExpense.id}_${user.uid}`, {
        storeName: expense.storeName,
        expenseId: createdExpense.id,
        userUid: user.uid,
        expenseDate: expense.date,
      });
      console.log('Success', 'Expense has been created');
      console.log(createdExpense);
      
      toastr.success('Success', 'Event has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  }
}