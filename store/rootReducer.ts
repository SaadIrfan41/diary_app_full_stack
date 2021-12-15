import { combineReducers } from '@reduxjs/toolkit'
import { api } from './rtkapi'
// import authReducer from './authSlice'
// import cartReducer from './cartSlice'

const rootReducer = combineReducers({
  //   Auth: authReducer,
  //   Cart: cartReducer,
  [api.reducerPath]: api.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
