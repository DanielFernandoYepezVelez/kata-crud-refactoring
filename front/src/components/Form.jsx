import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Read from './Read';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { createNewTodoAction, editTodoAction } from '../actions/todoAction';

const Form = () => {
    const [nameTodo, saveNameTodo] = useState('');
    const history = useHistory();

    const dispatch = useDispatch();
    const addTodo = todo => dispatch(createNewTodoAction(todo));

    const submitTodo = e => {
        e.preventDefault();
        if (nameTodo.trim() === '') { return; }
        addTodo(nameTodo);
        saveNameTodo('');
        history.push('/');
    }

    /* ======== AQUI EMPIEZA EL EDITAR ========== */
    const [updateTodo, updateCompleteTodo] = useState({ name: '' });
    const todoUpdate = useSelector(state => state.todos.todoEdit);

    /* Lleno El Segundo State Depues De Consultar El Store */
    useEffect(() => {
        if (!todoUpdate) {
            return;
        }
        updateCompleteTodo(todoUpdate);
    }, [todoUpdate]);

    /* Aqui Leo Los Datos Que Estan En El Formulario Depues De Dar Click En Editar */
    /* Nota => El Valor Del name Del Input Es Igual Al name Del Objeto updateTodo */
    const onChangeTodoUpdate = e => {
        updateCompleteTodo({
            ...updateTodo,
            [e.target.name]: e.target.value
        });
    }

    const submitTodoUpdate = e => {
        e.preventDefault();
        if (updateTodo.name.trim() === '') { return; }
        dispatch(editTodoAction(updateTodo))
        history.push('/');
    }


    return (
        <Fragment>
            {todoUpdate === null ? (
                <form onSubmit={submitTodo}>
                    <p>
                        <input
                            type="text"
                            required
                            placeholder="¿Qué piensas hacer hoy?"
                            name="nameTodo"
                            value={nameTodo}
                            onChange={e => saveNameTodo(e.target.value)} />
                        <button type="submit">Crear TO-DO</button>
                    </p>
                </form>
            ) : (
                    <form onSubmit={submitTodoUpdate}>
                        <p>
                            <input
                                type="text"
                                required
                                placeholder="Editar Todo!"
                                name="name"
                                value={updateTodo.name}
                                onChange={onChangeTodoUpdate} />
                            <button type="submit">Actualizar TO-DO</button>
                        </p>
                    </form>
                )}
            <Read />
        </Fragment>
    );
}

export default Form;