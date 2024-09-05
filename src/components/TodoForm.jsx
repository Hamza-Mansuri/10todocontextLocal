import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    
    //zaahir si baat e, form he to add hoga todo

    //single todo hi add karege, isliye todo
    const [todo, setTodo] = useState("")

    //ab yaha pe humko addTodo ki functinality chahiye, to wo hum useTodo se laaege.
    //useTodo ke paas sara context he.

    const {addTodo} = useTodo()

    const add = (e) => {

        e.preventDefault()

        if(!todo) return

        addTodo( { todo , completed:false } )

        //add krne ke baad set krdo

        setTodo("")

    }

    return (
        <form  className="flex" onSubmit={add}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}

                onChange={ (e) => setTodo( e.target.value ) }
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

