import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import firebase from 'firebase';
import { db } from './config/firebase';
import Modal, { POSITION } from './components/Modal';
import './App.css';
import Header from './components/Header';


function App() {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [openTodo, setOpenTodo] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState({});
  const [search, setSearch] = React.useState('');

  // when the page loads, we listen to the database and fetch new todos as they get add/remove
  React.useEffect(() => {
    db
      .collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setTodos(snapshot.docs.map(doc => (
          {
            id: doc.id,
            todo: doc.data().todo
          }
        )));
      });
  }, []);
  const AddTodoHandler = (event) => {
    //fire when btn click
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    // setTodos([...todos, input]);
    setInput('');
  };
  const TodoHandler = () => setOpenTodo(true);
  const closeTodoHandler = () => setOpenTodo(false);
  const ModalHandler = () => setOpen(false);
  const editHandler = (id, title) => {
    setCurrentTodo({ id, title });
    setOpen(true);
  };
  const updateTodoHandler = () => {
    currentTodo && db.collection('todos')
      .doc(currentTodo?.id)
      .set({
        todo: input
      }, { merge: true });

    setInput('');
    setCurrentTodo({});
    setOpen(false);
  };
  const onKeyPressHandler = (event) => {
    if (event.target.value.length > 0 && event.target.scrollHeight > 41) {
      event.target.style.height = `${event.target.scrollHeight}px`;
      return;
    }
    event.target.style.height = "41px";
    return false;

  };

  return (
    <div className="App">
      <Header submitHandler={() => {}} searchInput={search} setSearchInput={setSearch} />

      <h1>What's up!</h1>

      <div className="todo">
        <p>Today's tasks</p>
        {todos.length !== 0 ? (
          <ul className="todo__list">
            {
              todos.map((todo, index) => {
                return (
                  <li className="todo__listItem" key={index}>
                    <div className="todo__info">
                      <div className="todo__tickContainer" />
                      <strong>{todo.todo || ""}</strong>
                    </div>
                    <div className="todo__listItemBtn">
                      <button type="button" aria-label="edit btn" onClick={() => editHandler(todo.id, todo.todo)}><EditIcon /></button>
                      <button type="button" aria-label="delete btn" onClick={() => db.collection('todos').doc(todo.id).delete()}> <DeleteForeverIcon /></button>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        ) : (<h4>What is your main focus for today?</h4>)}
      </div>

      {open && (<Modal title="Hey!" modalHandler={ModalHandler}>
        <form className="addTodo__form">
          <div className="form-group">
            <label htmlFor="my-input">
              <h4><span role="img" aria-label="tick emoji">✅</span> Add your todo</h4>
            </label>
            <CreateIcon className="svg__pen" />
            <textarea
              placeholder="todo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              id="my-input"
              aria-describedby="my-helper-text"
              inputMode="text"
              maxLength="200"
              onKeyPress={onKeyPressHandler}
            > </textarea>
          </div>
          <button aria-label="edit todo" disabled={!input} type="submit" onClick={updateTodoHandler}>
            Edit
            </button>
        </form>
      </Modal>)}

      {openTodo && (<Modal modalHandler={closeTodoHandler} position={POSITION.MEDIUM}>
        <form className="addTodo__form">
          <div className="form-group">
            <label htmlFor="my-input">
              <h4><span role="img" aria-label="tick emoji">✅</span> Add your todo</h4>
            </label>
            <CreateIcon className="svg__pen" />
            <textarea
              placeholder="todo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              id="my-input"
              aria-describedby="my-helper-text"
              inputMode="text"
              maxLength="200"
              onKeyPress={onKeyPressHandler}
            > </textarea>
          </div>
          <button aria-label="add todo" disabled={!input} type="submit" onClick={AddTodoHandler}>
            Add Todo
          </button>
        </form>
      </Modal>)}

      <button type="button" aria-label="show todo" className="addTodo" onClick={TodoHandler}><AddIcon /></button>
    </div>
  );
}

export default App;
