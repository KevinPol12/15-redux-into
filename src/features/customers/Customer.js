import { useSelector } from "react-redux";

function Customer() {
  /*2.) We should keep as much of the computations within the useSelector, rather
  than relying too much on tweeking the final state within the code.
  This useSelector is basically like subscribing to the consumption of the state 
  so if the state in the store changes, then this component will rerender*/
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
