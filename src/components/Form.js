import { useState } from "react";

export default function Form({ onAddItem }) {
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
