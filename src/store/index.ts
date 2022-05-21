import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { combineReducers } from 'redux'

import components from './components'

const store = configureStore({
  reducer: combineReducers({
    components,
  }),
  middleware: [],
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector

export default store
