import {
    START_DOWNLOAD_TODOS,
    CREATE_TODO_LOADING,
    CREATE_TODO_SUCCESSFULLY,
    CREATE_TODO_ERROR,
    DOWNLOAD_TODOS_SUCCESSFULLY,
    DOWNLOAD_TODOS_ERROR,
    GET_TODO_DELETE,
    TODO_DELETE_SUCCESSFULLY,
    TODO_DELETE_ERROR,
} from '../types/todoTypes';

import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;
// const response = await axios.post(`${baseUrl}/task/crear`, task, { headers: {"Content-Type":"application/json"}});

/* All Todos */
export function allTodosAction() {
    return async (dispatch) => {
        dispatch(allTodos);
        console.log("Obtener Las Tareas Cargando El Loading");
    }
}

const allTodos = () => ({
    type: START_DOWNLOAD_TODOS,
    payload: true
});

/* Create New Todos */
export function createNewTodoAction(todo) {
    return async(dispatch) => {
        dispatch(createTodoLoading());

        try {
            const response = await axios.post(`${baseUrl}/todo`, { name: todo }, { headers: {"Content-Type":"application/json"}});
            dispatch(createTodoSuccessfully(response.data));
        } catch (e) {
            // console.log(e);
            dispatch(createTodoError(true));
        }
    }
}

const createTodoLoading = () => ({
    type: CREATE_TODO_LOADING,
    payload: true,
});

const createTodoSuccessfully = todo => ({
    type: CREATE_TODO_SUCCESSFULLY,
    payload: todo,
})

const createTodoError = estado => ({
    type: CREATE_TODO_ERROR,
    payload: estado
});