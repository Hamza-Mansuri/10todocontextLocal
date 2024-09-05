import { createContext, useContext } from "react";

export const TodoContext = createContext( {

    //themeMode: "Light", same wahi kaam kara he bss variable me array liya he.
    todos: [
        {
        id: 1,
        todo: "todo massg",
        completed: false, //checked
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}

} )



export const useTodo = () => {
    return useContext(TodoContext) //jb bhi useContext rakho usko ek context dena padega, jo uski saari functionality lega
}

export const TodoProvider = TodoContext.Provider //TodoContext.Provider naa likhna pare isliye ye ek variable bana diya.

