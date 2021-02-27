import React, { Fragment, useState } from 'react';

/* Redux */
import { useDispatch } from 'react-redux';
import { createNewTodoAction } from '../actions/todoAction';

const Form = () => {
    const [nameTodo, saveNameTodo] = useState('');
    
    const dispatch = useDispatch();
    const addTodo = todo => dispatch(createNewTodoAction(todo));
    
    const submitCreateTask = e => {
        e.preventDefault();
        if (nameTodo.trim() === '') { return; } 
        addTodo(nameTodo);
        saveNameTodo('');
    }

    return (
        <Fragment>
            <form onSubmit={submitCreateTask}>
                <p>
                    <input
                        type="text"
                        required
                        placeholder="¿Qué piensas hacer hoy?"
                        name="nameTodo"
                        value={nameTodo} 
                        onChange={e => saveNameTodo(e.target.value)}/>
                    <button type="submit">Crear Tarea</button>
                </p>
            </form>
        </Fragment>
    );
}

export default Form;