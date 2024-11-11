"use client";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { DNDType } from "./types/kanbanTypes";
import ColumnCard from "./_components/ColumnCard";

const Kanban: React.FC = () => {
  // States
  const [columns, setColumns] = useState<DNDType[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentColumnId, setCurrentColumnId] =
    useState<UniqueIdentifier | null>(null);
  const [columnName, setColumnName] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");

  // Helpers
  const findValueOfItems = (id: UniqueIdentifier, type: string) => {
    if (type === "column") {
      return columns.find((column) => column.id === id);
    }

    if (type === "item") {
      return columns.find((column) =>
        column.items.find((item) => item.id === id)
      );
    }
  };

  //Dnd Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle items sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active column and over column
      const activeColumn = findValueOfItems(active.id, "item");
      const overColumn = findValueOfItems(over.id, "item");

      // If the active or over column is undefined, return
      if (!activeColumn || !overColumn) return;

      // Find the active and over columns
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumn.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumn.id
      );

      // Find the index of the active and over items
      const activeItemIndex = activeColumn.items.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = overColumn.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same column
      if (activeColumnIndex === overColumnIndex) {
        let newItems = [...columns];
        newItems[activeColumnIndex].items = arrayMove(
          newItems[activeColumnIndex].items,
          activeItemIndex,
          overItemIndex
        );

        setColumns(newItems);
      } else {
        // In different column
        let newColumns = [...columns];
        const [removedItem] = newColumns[activeColumnIndex].items.splice(
          activeItemIndex,
          1
        );

        newColumns[overColumnIndex].items.splice(overItemIndex, 0, removedItem);

        setColumns(newColumns);
      }
    }

    // Handling Item Drop into a column
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("column") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active column and over column
      const activeColumn = findValueOfItems(active.id, "item");
      const overColumn = findValueOfItems(over.id, "column");

      // If the active or over column is undefined, return
      if (!activeColumn || !overColumn) return;

      // Find the index of active and over columns
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumn.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumn.id
      );

      // Find the index of the active item in the active column
      const activeItemIndex = activeColumn.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active column and add it to the over column
      let newColumns = [...columns];
      const [removedItem] = newColumns[activeColumnIndex].items.splice(
        activeItemIndex,
        1
      );

      newColumns[overColumnIndex].items.push(removedItem);

      setColumns(newColumns);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {};

  return (
    <main className="flex-grow p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Kanban Board</h1>

      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={columns.map((column) => column.id)}>
            {columns.map((column) => (
              <ColumnCard
                key={column.id}
                id={column.id}
                title={column.title}
                onAddItem={() => {}}
                description=""
              >
                <SortableContext items={column.items.map((item) => item.id)}>
                  {column.items.map((item) => (
                    <div key={item.id}>{item.title}</div>
                  ))}
                </SortableContext>
              </ColumnCard>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </main>
  );
};

export default Kanban;
