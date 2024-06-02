import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from './Todo';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore"; 
import { db } from './Firebase'; 
import './index.css';  

const style = {
  bg: 'min-h-screen w-screen p-4 bg-gradient-to-r from-[#deccee] to-[#bddcee]', 
  container: 'bg-white-100 max-w-[500px] w-full m-auto rounded-md p-4',
  heading: 'text-3xl font-bold text-left-200px text-gray-800 p-2',
  form: 'flex justify-between',
  input: 'border p-2 w-full text-xl rounded-md',
  select: 'border p-2 ml-2 w-[150px] text-xl rounded-md',
  button: 'border p-4 ml-2 bg-[#C099FF] text-slate-100 rounded-md',
  count: 'text-center p-2 font-bold',
  search: 'border p-2 w-full text-xl rounded-md mt-2',
  noMatches: 'text-center p-2 text-red-500',
  matchCount: 'text-center p-2 font-bold text-green-500',
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [importance, setImportance] = useState('Importance');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editingInput, setEditingInput] = useState('');
  const [editingImportance, setEditingImportance] = useState('Importance');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a To-do task.');
      return;
    }
    if (importance === 'Importance') {
      alert('Invalid, please add level of importance.');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
      importance,
    });
    setInput('');
    setImportance('Importance');
  };

  // Read todo
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Edit todo
  const editTodo = async (e) => {
    e.preventDefault();
    if (editingInput === '') {
      alert('Please enter a To-do task.');
      return;
    }
    if (editingImportance === 'Importance') {
      alert('Invalid, please add level of importance.');
      return;
    }
    await updateDoc(doc(db, 'todos', editing.id), {
      text: editingInput,
      importance: editingImportance,
    });
    setEditing(null);
    setEditingInput('');
    setEditingImportance('Importance');
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  // Search 
  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.text.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, todos]);

  //Importance
  const sortTodosByImportance = (todos) => {
    const importanceOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };
    return todos.sort((a, b) => importanceOrder[a.importance] - importanceOrder[b.importance]);
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}> Task To-Do</h3>
        <form onSubmit={editing ? editTodo : createTodo} className={style.form}>
          <input
            value={editing ? editingInput : input}
            onChange={(e) => editing ? setEditingInput(e.target.value) : setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add To-Do"
          />
          <select
            value={editing ? editingImportance : importance}
            onChange={(e) => editing ? setEditingImportance(e.target.value) : setImportance(e.target.value)}
            className={style.select}
          >
            <option value="Importance">Importance</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option> 
          </select>
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={style.search}
          type="text"
          placeholder="Search To-Dos"
        />
        <ul>
          {search && filteredTodos.length === 0 ? (
            <p className={style.noMatches}>No Matches</p>
          ) : (
            sortTodosByImportance(filteredTodos).map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                setEditing={setEditing}
                setEditingInput={setEditingInput}
                setEditingImportance={setEditingImportance}
              />
            ))
          )}
        </ul>
        {search && filteredTodos.length > 0 && (
          <p className={style.matchCount}>
            {`Found ${filteredTodos.length} matching task${filteredTodos.length > 1 ? 's' : ''}`}
          </p>
        )}
        {!search && todos.length > 0 && (
          <p className={style.count}>
            {`You have ${todos.length} To-Do${todos.length > 1 ? 's' : ''}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
