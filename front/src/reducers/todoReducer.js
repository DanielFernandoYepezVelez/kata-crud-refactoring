import {
    CREATE_TODO_LOADING,
    CREATE_TODO_SUCCESSFULLY,
    CREATE_TODO_ERROR,
    START_DOWNLOAD_TODOS,
    DOWNLOAD_TODOS_SUCCESSFULLY,
    DOWNLOAD_TODOS_ERROR,
    GET_TODO_DELETE,
    TODO_DELETE_SUCCESSFULLY,
    TODO_DELETE_ERROR,
} from '../types/todoTypes';

/* Que Propiedades Debe Tener El State De TO-DO-List */
const initialState = {
    todos: [],
    error: null,
    loading: false,
    todoDelete: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
        case START_DOWNLOAD_TODOS:
        case CREATE_TODO_LOADING:
            return {...state, loading: action.payload }
        case CREATE_TODO_SUCCESSFULLY:
                return {...state, loading: false, todos: [...state.todos, action.payload] }
        case DOWNLOAD_TODOS_ERROR:
        case CREATE_TODO_ERROR:
            return {...state, loading: false, error: action.payload }
        case DOWNLOAD_TODOS_SUCCESSFULLY:
            return {...state, loading: false, todos: action.payload }
        case GET_TODO_DELETE:
            return {...state, todoDelete: action.payload }
        case TODO_DELETE_SUCCESSFULLY:
            return {...state, todos: state.todos.filter(todo => todo.id !== state.todoDelete), todoDelete: null }
        default:
            return state;
    }
}