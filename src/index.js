import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id != id));
  }

  function handleDone(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }
  return (
    <div>
      <Logo />
      <Adder onAddItems={handleAddItems} />
      <List items={items} onDeleteItem={handleDeleteItem} onDone={handleDone} />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1 className="logo-text">TODO LIST 💼 🐱‍🚀</h1>
    </div>
  );
}

function Adder({ onAddItems }) {
  const [description, setDestcription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, done: false, id: Date.now() };

    onAddItems(newItem);

    setDestcription("");
  }

  return (
    <form className="adder" onSubmit={handleSubmit}>
      <h2 className="adder-text">What to do?</h2>
      <input
        className="adder-input"
        type="Text"
        value={description}
        onChange={(e) => setDestcription(e.target.value)}
      />
      <button className="button-adder">Submit</button>
    </form>
  );
}

function List({ items, onDeleteItem, onDone }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onDone={onDone}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onDone }) {
  return (
    <li className="item-list">
      <input
        type="checkbox"
        value={item.done}
        onChange={() => onDone(item.id)}
      />
      <span
        className="item-text"
        style={item.done ? { textDecoration: "line-through" } : {}}
      >
        {item.description}
      </span>
      <button className="button-items" onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
