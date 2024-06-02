import React from 'react';
import { FaExclamationCircle, FaExclamationTriangle, FaRegCircle } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const style = {
  li: 'flex justify-between p-4 my-2 capitalize',
  liComplete: 'flex justify-between p-4 my-2 capitalize bg-slate-400',
  row: 'flex items-center',
  text: 'ml-2 cursor-pointer',
  textComplete: 'ml-2 cursor-pointer line-through',
  button: 'cursor-pointer flex items-center',
  importanceIcon: 'ml-2',
  icon: 'mx-1',
  editIcon: 'mr-2',
  checkbox: 'mr-2',
};

const Todo = ({ todo, toggleComplete, deleteTodo, setEditing, setEditingInput, setEditingImportance }) => {
  let importanceIcon;
  switch (todo.importance) {
    case 'high':
      importanceIcon = <FaExclamationCircle className={`${style.importanceIcon} text-red-500`} />;
      break;
    case 'medium':
      importanceIcon = <FaExclamationTriangle className={`${style.importanceIcon} text-orange-500`} />;
      break;
    case 'low':
      importanceIcon = <FaRegCircle className={`${style.importanceIcon} text-green-500`} />;
      break;
    default:
      importanceIcon = null;
  }

  const handleEdit = () => {
    setEditing(todo);
    setEditingInput(todo.text);
    setEditingImportance(todo.importance);
  };

  return (
    <li className={`${style.li} ${todo.completed ? style.liComplete : 'bg-slate-200'}`}>
      <div className={style.row}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo)}
          className={style.checkbox}
        />
        <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>
          {todo.text}
        </p>
      </div>
      <div className={style.button}>
        <AiOutlineEdit className={style.editIcon} onClick={handleEdit} />
        <AiOutlineDelete className={style.icon} onClick={() => deleteTodo(todo.id)} />
        {importanceIcon}
      </div>
    </li>
  );
};

export default Todo;
