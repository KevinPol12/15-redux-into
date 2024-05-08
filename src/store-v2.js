/*createStore from redux - is now deprecated and should only be used for learning purposes */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

/*Wiring the redux-devtools*/
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
