import React, { useState, useEffect } from 'react';
import Cookie from './Cookie.jsx'
import {useYandexMetrika} from './useCookie.js'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const [ymConsent, setYmConsent] = useState(false);
  const YM_COUNTER_ID = 12345678; // Замените на ваш ID счетчика

  // Проверяем сохраненное согласие при загрузке
  useEffect(() => {
    const consent = localStorage.getItem('ym_cookie_consent') === 'true';
    setYmConsent(consent);
  }, []);

  // Инициализируем Яндекс.Метрику при наличии согласия
  useYandexMetrika(YM_COUNTER_ID, ymConsent);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, text: editValue} : todo
    ));
    setEditId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Todo List</h1>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>Add</button>
      </div>
      
      <ul style={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              style={styles.checkbox}
            />
            
            {editId === todo.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => saveEdit(todo.id)}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                autoFocus
                style={styles.editInput}
              />
            ) : (
              <span 
                style={{
                  ...styles.todoText,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : '#333'
                }}
                onDoubleClick={() => startEdit(todo.id, todo.text)}
              >
                {todo.text}
              </span>
            )}
            
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Cookie onAccept={() => setYmConsent(true)}/>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    color: '#333'
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px'
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px 0 0 4px',
    outline: 'none'
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontSize: '16px'
  },
  list: {
    listStyle: 'none',
    padding: '0'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'white',
    marginBottom: '8px',
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  checkbox: {
    marginRight: '10px',
    cursor: 'pointer'
  },
  todoText: {
    flex: '1',
    fontSize: '16px'
  },
  editInput: {
    flex: '1',
    padding: '5px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none'
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px'
  }
};

export default App;