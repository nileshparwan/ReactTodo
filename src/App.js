import React from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = React.useState(["a", "b"]);
  const [input, setInput] = React.useState('');

  const AddTodoHandler = (event) => {
    //fire when btn click
    console.log('click');
    event.preventDefault();
    setTodos([...todos, input]);
    setInput('');
  };


  return (
    <div className="App">

      <h1>Hello people</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">✅ Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
        <Button disabled={!input} type="submit" onClick={AddTodoHandler} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((item, index) => <Todo key={index} item={item} />)}
      </ul>
    </div>
  );
}

export default App;
