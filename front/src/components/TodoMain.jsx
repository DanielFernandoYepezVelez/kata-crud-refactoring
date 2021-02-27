import React from 'react'

const TodoMain = ({todo}) => {
    return ( 
        <tr>
            <td className="id">{todo.id}</td>
            <td className="center">{todo.name}</td>
            <td className="check"><input type="checkbox" name="#" id="#" /></td>
            <td><button className="delete">Eliminar </button> <button className="edit">Editar </button></td>
        </tr>
     );
}
 
export default TodoMain;