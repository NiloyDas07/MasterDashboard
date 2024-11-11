import { Button } from "@/components/ui/button";
import { UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus } from "lucide-react";
import { DNDColumnsType, DNDItemsType } from "../types/kanbanTypes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Item from "./Item";
import AddTaskForm from "./AddTaskForm";

interface Props extends DNDColumnsType {
  handleAddItem: (columnId: UniqueIdentifier, task: DNDItemsType) => void;
  handleEditItem: (
    columnId: UniqueIdentifier,
    itemId: UniqueIdentifier,
    task: DNDItemsType
  ) => void;
}

const ColumnCard: React.FC<Props> = ({
  id,
  title,
  items,
  handleAddItem,
  handleEditItem,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "column",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <SortableContext items={items.map((item) => item.id)}>
      <Card
        ref={setNodeRef}
        style={style}
        className={`${
          isDragging ? "opacity-50 shadow-lg" : ""
        } bg-muted-2 w-1/3 min-w-72`}
      >
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>

          {/* Drag Button */}
          <Button
            variant="ghost"
            size="icon"
            className="cursor-grab active:cursor-grabbing touch-none pb-1.5"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5" />
            <span className="sr-only">Drag column</span>
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {items.map((item) => (
            <Item key={item.id} item={item} columnId={id} handleEditItem={handleEditItem} />
          ))}
        </CardContent>

        <CardFooter className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full text-balance">
                <Plus /> Add New Task
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-full max-h-svh overflow-scroll">
              <DialogHeader>
                <DialogTitle className="font-bold">Add New Task</DialogTitle>
                <DialogDescription className="font-semibold">
                  Please enter the details of the new task below.
                </DialogDescription>
              </DialogHeader>
              <AddTaskForm handleAddItem={handleAddItem} columnId={id} />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </SortableContext>
  );
};

export default ColumnCard;
