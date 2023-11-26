import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import todosSlice from './todo/reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos'],
}

const rootReducer = combineReducers({
  todos: todosSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
