export default function Stats({ items }) {
  const numPacked = items.filter((item) => item.packed).length;

  return (
    <div className="stats">
      You have {items.length} items on your list, and you packed {numPacked} (
      {items.length > 0 ? parseInt((numPacked / items.length) * 100) : 0}%)
    </div>
  );
}
