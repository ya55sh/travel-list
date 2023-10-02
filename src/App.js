import { useState } from "react";
import "./index.css";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackagingList from "./components/PackagingList";
import Stats from "./components/Stats";

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
