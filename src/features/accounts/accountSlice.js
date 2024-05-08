import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    /*To take more than a single parameter when dispatching the action,
    we must use the method prepare - which will allow to pass multiple
    values within the payload */
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

/*Exporting the new actions*/
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

/*Exporting the action that uses Thunk to fetch data and skipping it from the
accountSlice.actions export */
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  /*The action creator allows to pass type of actions easier and also to return
        functions that thunks middleware enables - where we can return a function rather than
        only a action object - this function will be then executed and then dispatch the
        action object with the fetched data*/
  return async function (dispatch, getState) {
    //API call
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();

    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
  //return action
}

/*Exporting the reducer slice */
export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//       case "account/withdraw":
//         return { ...state, balance: state.balance - action.payload };
//         case "account/requestLoan":
//           if (state.loan > 0) return state;
//           return {
//             ...state,
//             loan: action.payload.amount,
//             loanPurpose: action.payload.purpose,
//             balance: state.balance + action.payload.amount,
//           };
//           case "account/payLoan":
//             return {
//               ...state,
//               loan: 0,
//               loanPurpose: "",
//               balance: state.balance - state.loan,
//             };
//             case "account/convertingCurrency":
//         return {
//           ...state,
//           isLoading: true,
//         };
//         default:
//           return state;
//         }
//       }
//       /*Account - actionCreators */
//       export function deposit(amount, currency) {
//         if (currency === "USD") return { type: "account/deposit", payload: amount };

//         /*3.) The action creator allows to pass type of actions easier and also to return
//         functions that thunks middleware enables - where we can return a function rather than
//         only a action object - this function will be then executed and then dispatch the
//         action object with the fetched data*/
//         return async function (dispatch, getState) {
//           //API call
//           dispatch({ type: "account/convertingCurrency" });
//           const res = await fetch(
//             `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//           );
//           const data = await res.json();

//           dispatch({ type: "account/deposit", payload: data.rates.USD });
//         };
//         //return action
//       }

//       export function withdraw(amount) {
//         return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }

// /*account dispatching */
// store.dispatch(deposit(500));
// console.log(store.getState());

// store.dispatch(withdraw(200));
// console.log(store.getState());

// store.dispatch(requestLoan(1000, "Buy a cheap car"));
// console.log(store.getState());

// store.dispatch(payLoan());
// console.log(store.getState());
