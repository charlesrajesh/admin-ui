import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import pendingConfirmationReducer from './pendingConfirmationReducer'

const combinedReducers = combineReducers({
  UserReducer,
  pendingConfirmationReducer
})

export default combinedReducers
