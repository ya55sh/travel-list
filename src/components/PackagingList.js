import { useState } from "react";
import Item from "./Item";

export default function PackagingList({
  items,
  onDeleteItem,
  onPackedItem,
  onClearlist,
}) {
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
