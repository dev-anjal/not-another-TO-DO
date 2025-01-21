import { useEffect, useState } from "react";
import "./styles.css";

export default function Home() {
  const [NewItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  function handleSubmit(e) {
    e.preventDefault();

    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text: NewItem, completed: false },
    ]);
    setNewItem("");
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, completeTask]);

  function completeTask(key) {
    const newTodos = todos.map((todo) =>
      todo.id === key ? { ...todo, completed: !todo.completed } : todo
    );
    console.log(newTodos);

    setTodos(newTodos);
  }
  function deletetodo(key) {
    const newTodos = todos.filter((todo) => todo.id !== key);
    setTodos(newTodos);
  }

  return (
    <>
      <form className="form-row" onSubmit={handleSubmit}>
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          id="item"
          value={NewItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To DO list</h1>
      <ul className="list">
        {todos.map((todo, id) => (
          <li key={id} className={id.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                {...(todo.completed ? { checked: true } : {})}
                name=""
                id=""
                onClick={() => completeTask(todo.id)}
              />
              {todo.text}
            </label>
            <button
              className="btn btn-danger"
              onClick={() => deletetodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
