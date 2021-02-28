import React from 'react';

/* Redux */
import { useDispatch } from 'react-redux';
import { deleteTodoAction } from '../actions/todoAction';

const TodoMain = ({todo}) => {
    const { id } = todo;
    const dispatch = useDispatch();

    const confirmDeleteTodo = todoID => {
        dispatch(deleteTodoAction(todoID));
    }

    const confirmEditTodo = todoID => {
        console.log(todoID);
    }

    return ( 
        <tr>
            <td className="id">{todo.id}</td>
            <td className="center">{todo.name}</td>
            <td className="check"><input type="checkbox" name="#" id="#" /></td>
            <td>
                <button className="delete" onClick={() => confirmDeleteTodo(id)}>Eliminar</button>
                <button className="edit" onClick={() => confirmEditTodo(id)}>Editar</button>
            </td>
        </tr>
     );
}
 
export default TodoMain;