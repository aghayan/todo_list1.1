import { Todo } from "./pages/todo_list";
import { useEffect, useState } from 'react'
import { RingLoader } from 'react-spinners';

function App() {

  

  const [list, setList] = useState([
    {title: 'Learn Html', id: '1', isChecked: false},
    {title: 'Learn Css', id: '2', isChecked: false},
    {title: 'Learn Js', id: '3', isChecked: false},
    {title: 'Learn React', id: '4', isChecked: false},
    {title: 'Learn PHP', id: '5', isChecked: false},

])

const [isLoading, setIsLoading] = useState(true);                                                    
 useEffect(() => {
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
}, []);

if (isLoading) {
  return (
    <div className="loading">
      <RingLoader color="rgb(132, 122, 255)" size={200}/>
      <h2>Loading...</h2>
    </div>
   )
}

  return (
    <div className="App">
      <Todo  
      todo={list}
          
          
       onChange={(newTodo) => {
            setList(list.map((elem) => {
              if (elem.id === newTodo.id) {
                return newTodo;
              }
              return elem
            }
            ))
          }}/>

      {/* <TodoFooter /> */}
    
    </div>
  );
}

export default App;
