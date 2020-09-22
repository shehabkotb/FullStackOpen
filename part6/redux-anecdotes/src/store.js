import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer.js"
import notificationReducer from "./reducers/notificationReducer.js"
import { composeWithDevTools } from "redux-devtools-extension"
import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
