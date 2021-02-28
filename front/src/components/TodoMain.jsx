import React from 'react';
import { useHistory } from 'react-router-dom';

/* Redux */
import { useDispatch } from 'react-redux';
import { deleteTodoAction, getEditTodoAction } from '../actions/todoAction';

const TodoMain = ({todo}) => {
    const { id, name } = todo;
    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDeleteTodo = todoID => {
        dispatch(deleteTodoAction(todoID));
    }

    const confirmEditTodo = todoUpdate => {
        dispatch(getEditTodoAction(todoUpdate));
        history.push(`/todoUpdate/${todoUpdate.id}`);
    }

    return ( 
        <tr>
            <td className="id">{id}</td>
            <td className="center">{name}</td>
            <td className="check"><input type="checkbox" name="#" id="#" /></td>
            <td>
                <button type="button" className="delete" onClick={() => confirmDeleteTodo(id)}>Eliminar</button>
                <button type="button" className="edit" onClick={() => confirmEditTodo(todo)}>Editar</button>
            </td>
        </tr>
     );
}
 
export default TodoMain;