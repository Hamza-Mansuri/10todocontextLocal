import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {

  //useTodo se saari functionality le kr aao

  const {updateTodo, deleteTodo , toggleComplete} = useTodo()

  //States
  //todo editable he ki nahi uske liye state
  const [isTodoEditable, setIsTodoEditable] = useState(false) //pehle se editable thodi na hoga isliye false

  //jb hum Edit pe click karege to ek massg andr jo pehle se tha usko bhi to handle krna padega.
  const [todoMsg, setTodoMsg] = useState(todo.todo) //jo bhi todo he uska todo.

  const editTodo = () => {

    // pehle tod ko spread kiya ...todo, aur uske andr se ek value leli.
    updateTodo( todo.id, {...todo, todo: todoMsg} )
    
    //upr tk jitna kaam hona tha ho gaya, ab false krdo

    setIsTodoEditable(false)

  }

  //ab toggle ko handle krna padega

  const toggleCompleted = () => {

    toggleComplete(todo.id)

  }
    

  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]" //agr todo complete he to ? true : false
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}

              //readonly tb hi hoga jb isTodoEditable NAHI hoga
              readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>
      </div>
  );
}

export default TodoItem;
