export default function Item({ item, onDeleteItem, onPackedItem }) {
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
