import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

console.log({ reducer });

const store = createStore(reducer, applyMiddleware(thunk));

console.log(store.getState());
export default store;
