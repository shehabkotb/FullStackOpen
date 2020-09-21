import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer.js"
import notificationReducer from "./reducers/notificationReducer.js"
import { composeWithDevTools } from "redux-devtools-extension"
import { combineReducers, createStore } from "redux"

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store
