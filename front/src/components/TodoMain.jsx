import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/* Redux */
import { useDispatch } from 'react-redux';
import { deleteTodoAction, getEditTodoAction, checkedTodoAction } from '../actions/todoAction';

const TodoMain = ({todo}) => {
    const { id, name, completed } = todo;
    
    const [checkbox, setcheckbox] = useState(todo.completed);
    const history = useHistory();
    const dispatch = useDispatch();

    const confirmDeleteTodo = todoID => {
        dispatch(deleteTodoAction(todoID));
    }

    const confirmEditTodo = todoUpdate => {
        dispatch(getEditTodoAction(todoUpdate));
        history.push(`/todoUpdate/${todoUpdate.id}`);
    }

    const confirmStateCheck = (checked, todoUpdate) => {
        todoUpdate.completed = checked;
        dispatch(checkedTodoAction(todoUpdate));
        setcheckbox(todo.completed);
    }

    return ( 
        <tr>
            <td className={checkbox ? "id checkedTodo" : "id"}>{id}</td>
            <td className={checkbox ? "center checkedTodo" : "center"}>{name}</td>
            <td className="check">
                <input type="checkbox" defaultChecked={completed} onChange={e => confirmStateCheck(e.target.checked, todo) }/>
            </td>
            <td>
                <button type="button" className="delete" onClick={() => confirmDeleteTodo(id)}>Eliminar</button>
                <button type="button" className="edit" onClick={() => confirmEditTodo(todo)}>Editar</button>
            </td>
        </tr>
     );
}
 
export default TodoMain;