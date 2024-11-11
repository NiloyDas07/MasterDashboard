"use client";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
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
import { useEffect, useState } from "react";
import { DNDColumnsType, DNDItemsType } from "./types/kanbanTypes";
import ColumnCard from "./_components/ColumnCard";
import { initialColumns } from "./data/kanbanInitialData";

const Kanban: React.FC = () => {
  let localStorageData;

  useEffect(() => {
    localStorageData = localStorage.getItem("kanbanColumns");
    if (localStorageData) {
      setColumns(JSON.parse(localStorageData));
    }
  }, []);

  const [columns, setColumns] = useState<DNDColumnsType[]>(
    localStorageData ? JSON.parse(localStorageData) : initialColumns
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "column";
    const isOverAColumn = over.data.current?.type === "column";

    if (!isActiveAColumn && isOverAColumn) {
      setColumns((columns) => {
        const activeColumn = columns.find((col) =>
          col.items.some((item) => item.id === activeId)
        );
        const overColumn = columns.find((col) => col.id === overId);

        if (!activeColumn || !overColumn) return columns;

        const activeItemIndex = activeColumn.items.findIndex(
          (item) => item.id === activeId
        );
        const activeItem = activeColumn.items[activeItemIndex];

        return columns.map((col) => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              items: col.items.filter((item) => item.id !== activeId),
            };
          } else if (col.id === overColumn.id) {
            return {
              ...col,
              items: [...col.items, activeItem],
            };
          } else {
            return col;
          }
        });
      });
    }

    if (isActiveAColumn && isOverAColumn) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeId
        );
        const overColumnIndex = columns.findIndex((col) => col.id === overId);
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "column";

    if (!isActiveAColumn) {
      setColumns((columns) => {
        const startColumn = columns.find((col) =>
          col.items.some((item) => item.id === activeId)
        );
        const finishColumn = columns.find((col) =>
          col.items.some((item) => item.id === overId)
        );

        if (!startColumn || !finishColumn) return columns;

        if (startColumn.id === finishColumn.id) {
          // Reorder items within the same column
          const updatedItems = arrayMove(
            startColumn.items,
            startColumn.items.findIndex((item) => item.id === activeId),
            finishColumn.items.findIndex((item) => item.id === overId)
          );

          return columns.map((col) =>
            col.id === startColumn.id ? { ...col, items: updatedItems } : col
          );
        }

        // Move item to a different column
        const activeItemIndex = startColumn.items.findIndex(
          (item) => item.id === activeId
        );
        const activeItem = startColumn.items[activeItemIndex];

        return columns.map((col) => {
          if (col.id === startColumn.id) {
            return {
              ...col,
              items: col.items.filter((item) => item.id !== activeId),
            };
          } else if (col.id === finishColumn.id) {
            return {
              ...col,
              items: [...col.items, activeItem],
            };
          } else {
            return col;
          }
        });
      });
    }

    setActiveId(null);
  };

  const handleAddItem = (columnId: UniqueIdentifier, task: DNDItemsType) => {
    setColumns((prevColumns) => {
      return prevColumns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            items: [...col.items, task],
          };
        }
        return col;
      });
    });
  };

  const handleEditItem = (
    columnId: UniqueIdentifier,
    itemId: UniqueIdentifier,
    task: DNDItemsType
  ) => {
    setColumns((prevColumns) => {
      return prevColumns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            items: col.items.map((item) => {
              if (item.id === itemId) {
                return task;
              }
              return item;
            }),
          };
        }
        return col;
      });
    });
  };

  // Update to localstorage everytime columns change
  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  return (
    <main className="flex-grow p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Kanban Board</h1>

      <div className="flex-grow flex gap-4 overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={columns.map((column) => column.id)}>
            {columns.map((column) => (
              <ColumnCard
                key={column.id}
                id={column.id}
                title={column.title}
                items={column.items}
                handleAddItem={handleAddItem}
                handleEditItem={handleEditItem}
              ></ColumnCard>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </main>
  );
};

export default Kanban;
