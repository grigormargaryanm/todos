import {TodosState} from "./reducer";

type State = { todos: TodosState };

const getTodos = (state: State) => state.todos.todos;

export default {
    getTodos,
};

