import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
  })

export default createRootReducer
