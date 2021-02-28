import React, { Fragment, useEffect } from 'react';
import TodoMain from './TodoMain';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import { allTodosAction } from '../actions/todoAction';

const Read = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const allTodos = () => dispatch(allTodosAction());
        allTodos();
    }, [dispatch]);

    const todos = useSelector(state => state.todos.todos);

    return (
        <Fragment>
            <table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarea</th>
                        <th>¿Completado?</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.length === 0 ? <tr><td>No Hay Tareas</td></tr> : (
                        todos.map(todo => (
                            <TodoMain key={todo.id} todo={todo} />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Read;