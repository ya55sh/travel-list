import { useState } from "react";
import "./index.css";

const initialItems = [
  {
    id: 1,
    description: "Passports",
    quantity: "2",
    packed: false,
  },
  {
    id: 2,
    description: "Socks",
    quantity: "3",
    packed: false,
  },
  {
    id: 3,
    description: "Shirts",
    quantity: "5",
    packed: true,
  },
];

function App() {
  const [items, setItem] = useState([]);

  function handleAddItem(newItem) {
    setItem((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItem((items) =>
      items.filter((item) => {
        if (id !== item.id) return item;
      })
    );
  }

  function handleClearList() {
    setItem([]);
  }

  function handlePacked(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="container">
      <div className="sub_container">
        <Logo />
        <Form onAddItem={handleAddItem} />
        <PackagingList
          items={items}
          onDeleteItem={handleDeleteItem}
          onPackedItem={handlePacked}
          onClearlist={handleClearList}
        />
        <Stats items={items} />
      </div>
    </div>
  );
}

export default App;

function Logo() {
  return (
    <div className="logo">
      <h1>🌴 Far Away 💼</h1>
    </div>
  );
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItem(newItem);

    setDescription("");
    setquantity(1);
  }

  return (
    <div className="essential-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Essentials for this trip -</h3>
        <select
          value={quantity}
          onChange={(e) => {
            setquantity(parseInt(e.target.value));
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          className="esInputName"
          type="text"
          placeholder="Item. . ."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="esButton">ADD</button>
      </form>
    </div>
  );
}

function PackagingList({ items, onDeleteItem, onPackedItem, onClearlist }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="packageList">
      <div className="itemList">
        <p>Your Items: </p>
        <ul>
          {sortedItems.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                onDeleteItem={onDeleteItem}
                onPackedItem={onPackedItem}
              />
            );
          })}
        </ul>
      </div>
      <div className="plButtonList">
        <select
          className="plButton"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button className="plButton" onClick={onClearlist}>
          CLEAR LIST
        </button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onPackedItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={(e) => {
          onPackedItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button className="btnDelete" onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  const numPacked = items.filter((item) => item.packed).length;

  return (
    <div className="stats">
      You have {items.length} items on your list, and you packed {numPacked} (
      {items.length > 0 ? parseInt((numPacked / items.length) * 100) : 0}%)
    </div>
  );
}
