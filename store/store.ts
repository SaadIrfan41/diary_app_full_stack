import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { useDispatch } from 'react-redux'
import { api } from './rtkapi'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
