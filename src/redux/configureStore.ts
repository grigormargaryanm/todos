import {combineReducers, configureStore} from "@reduxjs/toolkit";
import todosSlice from './todo/reducer'

const rootReducer = combineReducers({
    todos: todosSlice,
})


export const setupStore = () => (
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({serializableCheck: false})
    })
)