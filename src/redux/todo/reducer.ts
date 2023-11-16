import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodos, TodoStatus} from "../../types/ITodos";

export interface TodosState {
    todos: ITodos[];
}

const initialState: TodosState = {
    todos: []
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodo(state, action: PayloadAction<ITodos>) {
            state.todos.push(action.payload)
        },
        editTodo(state, action: PayloadAction<ITodos[]>) {
            state.todos = action.payload
        },
        deleteTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    todo.status = TodoStatus.REMOVED
                }
                return todo
            })
        }
    },
})

export const {deleteTodo, setTodo, editTodo} = todosSlice.actions

export default todosSlice.reducer;