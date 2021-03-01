import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Read from './Read';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { createNewTodoAction, editTodoAction } from '../actions/todoAction';

const Form = () => {
    const [nameTodo, saveNameTodo] = useState('');
    const [updateTodo, updateNameTodo] = useState('');
    const history = useHistory();

    const todoUpdate = useSelector(state => state.todos.todoEdit);
    const addTodoUpdate = newTodo => dispatch(editTodoAction(newTodo));

    const dispatch = useDispatch();
    const addTodo = todo => dispatch(createNewTodoAction(todo));

    const submitTodo = e => {
        e.preventDefault();

        if (!todoUpdate) {
            if (nameTodo.trim() === '') return;
            addTodo(nameTodo);
            saveNameTodo('');
        }

        if (todoUpdate) {
            if (updateTodo.trim() === '') return;
            todoUpdate.name = updateTodo;
            addTodoUpdate(todoUpdate);
            updateNameTodo('');
        }

        history.push('/');
    }


    return (
        <Fragment>
            <form onSubmit={submitTodo}>
                <label className="label">{todoUpdate === null ? '' : `TO-DO: ${todoUpdate.name}`}</label>
                <p>
                    <input
                        type="text"
                        required
                        placeholder= {todoUpdate === null ? "¿Qué piensas hacer hoy?" : "Editar Todo!"}
                        name={todoUpdate === null ? "nameTodo" : "updateTodo"}
                        value={todoUpdate === null ? nameTodo : updateTodo}
                        onChange={todoUpdate === null ? e => saveNameTodo(e.target.value) : e => updateNameTodo(e.target.value)} />
                    <button type="submit">{todoUpdate === null ? "Crear TO-DO" : "Actualizar TO-DO"}</button>
                </p>
            </form>
            <Read />
        </Fragment>
    );
}

export default Form;