import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";

/*The configure store automatically combines the Reducers, creates 
the store, applies the middleware -thunk- and enables the redux dev 
tools */
const store = configureStore({
  reducer: { account: accountReducer, customer: customerReducer },
});

export default store;
