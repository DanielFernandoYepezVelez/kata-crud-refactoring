import React, { Fragment } from 'react';

const Form = () => {
    return (
        <Fragment>
            <form /* onSubmit={submitCreateTask} */>
                <p>
                    <input
                        type="text"
                        required
                        placeholder="¿Qué piensas hacer hoy?"
                        name="name"
                        /* value={name} 
                        onChange={e => saveNameTask(e.target.value)} *//>
                    <button type="submit">Crear Tarea</button>
                </p>
            </form>
        </Fragment>
    );
}

export default Form;