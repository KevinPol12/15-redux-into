/*createStore from redux - is now deprecated and should only be used for learning purposes */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

/*1.) To use thunk as middleware we first import {thunk} and then apply it
as Middleware to the redux store, now we are good to use it*/
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
