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
    GET_TODO_EDIT,
    START_TODO_EDIT,
    TODO_EDIT_SUCCESSFULLY,
    TODO_EDIT_ERROR,
    CHECKED_TODO_UPDATE
} from '../types/todoTypes';

import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

/* Create New Todos */
export function createNewTodoAction(todo) {
    return async(dispatch) => {
        dispatch(createTodoLoading());

        try {
            const response = await axios.post(`${baseUrl}/todo`, { name: todo }, { headers: {"Content-Type":"application/json"}});
            dispatch(createTodoSuccessfully(response.data.todo));
        } catch (e) {
            /* console.log(e); */
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

/* All Todos */
export function allTodosAction() {
    return async (dispatch) => {
        dispatch(allTodosLoading());
        
        try {
            const response = await axios.get(`${baseUrl}/todos`, { headers: {"Content-Type":"application/json"}});
            dispatch(allTodosSuccessfully(response.data));
        } catch (e) {
            /* console.log(e); */
            dispatch(allTodosError(true));
        }
    }
}

const allTodosLoading = () => ({
    type: START_DOWNLOAD_TODOS,
    payload: true,
});

const allTodosSuccessfully = todos => ({
    type: DOWNLOAD_TODOS_SUCCESSFULLY,
    payload: todos,
});

const allTodosError = estado => ({
    type: DOWNLOAD_TODOS_ERROR,
    payload: estado,
});

/* Delete TODO */
export function deleteTodoAction(id) {
    return async(dispatch) => {
        dispatch(getTodoId(id));

        try {
            await axios.delete(`${baseUrl}/todo/${id}`);
            dispatch(todoDeleteSuccessfully());
        } catch (e) {
            /* console.log(e); */
            dispatch(todoDeleteError(true));
        }
    }
}

const getTodoId = todoID => ({
    type: GET_TODO_DELETE,
    payload: todoID,
});

const todoDeleteSuccessfully = () => ({
    type: TODO_DELETE_SUCCESSFULLY,
});

const todoDeleteError = estado => ({
    type: TODO_DELETE_ERROR,
    payload: estado,
});

/* Edit TODO */
export function getEditTodoAction(todo) {
    return (dispatch) => {
        dispatch(getTodoEdit(todo));
    }
}

/* Aqui Solo Obtengo El TODO Para Asignarlo En El Store */
const getTodoEdit = todo => ({
    type: GET_TODO_EDIT,
    payload: todo,
});

/* Aqui Actualizo Solo El Nombre De La Tarea */
export function editTodoAction(todo) {
    return async(dispatch) => {
        dispatch(editTodo(todo));

        try {
            await axios.put(`${baseUrl}/todo/${todo.id}`, todo, { headers: {"Content-Type":"application/json"}});
            dispatch(editTodoSuccessfully(null));
        } catch (e) {
            // console.log(e);
            dispatch(editTodoError(true));
        }
    }
}

const editTodo = todo => ({
    type: START_TODO_EDIT,
    payload: todo,
});

const editTodoSuccessfully = todoEdit => ({
    type: TODO_EDIT_SUCCESSFULLY,
    payload: todoEdit,
});

const editTodoError = estado => ({
    type: TODO_EDIT_ERROR,
    payload: estado
});

/* Aqui Actualizo Solo El Completed De La Tarea */
export function checkedTodoAction(todo) {
    return async (dispatch) => {

        try {
            await axios.put(`${baseUrl}/todo/${todo.id}`, todo, { headers: {"Content-Type":"application/json"}});
            dispatch(checkboxTodo());
        } catch (e) {
            // console.log(e);
        }
    }
}

const checkboxTodo = () => ({
    type: CHECKED_TODO_UPDATE
});