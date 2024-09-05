import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  
  //todos saare todos he.
  //todos ek array he jisme bht saari values he.
  const [todos, setTodos] = useState([]) //empty rakha he array me bcz loop chalani hogi

  const addTodo = (todo) => {

    //setTodos(todo) esa karege to, puraani saari values delete ho jaaego uss todo ke andr, aur nayi set hogi
    //to humko puraani state ki values chahiye.

    //puraana array mil jaaega, puraane se ek naya array bana do.
    setTodos( (prev) => [{ id: Date.now(), ...todo  }, ...prev] ) //... destructure kara, js ke concept se.
    

  }



  const updateTodo = (id, todo) => {

    //saare todos ek array he, to usko loop me lagana padega, loop lagage find krna padega ki konsi id se update ho raha he, aur usme naya todo add kr dege.

    //todos ek object he, aur uske andr id ne sb he.
    //prevTodo har ek individual ko target karega. prev.map ki help se
    setTodos( (prev) => prev.map( ( prevTodo ) => (prevTodo.id === id ? todo : prevTodo )) ) // ? true (he to add krdo) : false (to prev todoas it rehne do kuch change krna hi nahi he.)

    // prev.map( (eachValue) => {

    //   if(eachValue === id) prevTodo id ke value barabr he, to as it is rehne do.
    //   {
    //     todo
    //   }

    // } )

  }



  const deleteTodo = (id) => {

    setTodos( (prev) => prev.filter( (todo) => todo.id !== id ) ) //prev.filter true statement pe work krta he. to jo id match nahi hogi wo aati jaaegi, aur jo  kr jaaegi wahi reh jaaegi.

  }



  const toggleComplete = (id) => {

    //yaha pe id match karege.   ? true : flase(prevTodo) hi rehne do, {...prevTodo} saari values aa gayi, id, todomassg, completed wo sb.
    // ? true me{...prevTodo, completed ko overwrite kiya} : 
    setTodos( (prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ? { ...prevTodo,
          completed: !prevTodo.completed } : prevTodo
      )
    )

  }

  //storing in local storage.
  //Ques
  //jb meri application load ho, to hoo sakta he ki mene pehle se mere Todos ADD kr rakhi ho.
  //to jo add hui ho usko hum LocalStorage ke andr add karege.
  //if server side pe kaam kr rahe ho b localstorage ki zarurat nahi.

  //to jb mera application load hoga, to saari values load ho jaaegi todos me, wo useEffect kaam krek dega.

  //syntax:-
  //localStorage.getItem("key"), isko JSON me store karege. JSON.parse()

  useEffect( () => {

    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0)
    {
      setTodos(todos)
    }

  },[] )


  //localstorage ki story aage badhi

  //ab jb bhi koi todo add ho raha he, me usko localstorage me add krna chahta hu.

  //setItem("key and value") dono deni padti he.
  //jo key ka naam humne getItem me liya tha, wahi Dete time setItem dena padta he. SAME NAME

  useEffect( () => {

    localStorage.setItem("todos", JSON.stringify(todos))

  },[todos] )

  //localstorage ka kaam atomatic hoga.





  return (

    // Wrap the Content in TOdoProvider, aur uski saari VALUES
    <TodoProvider value={ { todos, addTodo, updateTodo, deleteTodo, toggleComplete } }> 
      <h1 className='text-3xl text-gray-500 text-center'>10 todo context local</h1>

      <div className="bg-[#172842] min-h-screen py-8">

        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">

          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>

        <div className="mb-4">

          {/* Todo form goes here */}

          <TodoForm />


        </div>

          <div className="flex flex-wrap gap-y-3">

            {/*Loop and Add TodoItem here */}

            {/* () => {} isme return krna padta he
            () => () isme autoreturn hota he */}
              

            { todos.map( (todo) => (

              <div key={ todo.id } className='w-full'>

                <TodoItem todo={todo}/>

              </div>

            ) ) }
            
          </div>

        </div>

      </div>

    </TodoProvider>

  )
}

export default App
