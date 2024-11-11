import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Edit, GripVertical } from "lucide-react";
import { DNDItemsType } from "../types/kanbanTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditTaskForm from "./EditTaskForm";

type Props = {
  item: DNDItemsType;
  columnId: UniqueIdentifier;
  handleEditItem: (
    columnId: UniqueIdentifier,
    itemId: UniqueIdentifier,
    task: DNDItemsType
  ) => void;
};

const Item = ({ item, columnId, handleEditItem }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "item",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  const dueDate = new Date(item.dueDate);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={` ${isDragging ? "opacity-50 shadow-lg" : ""} `}
    >
      <CardHeader className="flex-row items-center justify-between py-0 px-4">
        <CardTitle>{item.title}</CardTitle>

        {/* Drag Button */}
        <Button
          variant="ghost"
          size="icon"
          className="cursor-grab active:cursor-grabbing touch-none pb-1"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
          <span className="sr-only">Drag item</span>
        </Button>
      </CardHeader>
      <CardContent className="px-4 flex justify-between">
        <div>
          <p>{item.description}</p>
          <p className="text-muted-foreground">
            Due: {dueDate.toLocaleDateString()}
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" type="button">
              <Edit />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-full max-h-svh overflow-scroll">
            <DialogHeader>
              <DialogTitle className="font-bold">Edit Task</DialogTitle>
              <DialogDescription className="font-semibold">
                Update the details for the task below.
              </DialogDescription>
            </DialogHeader>
            <EditTaskForm
              columnId={columnId}
              itemId={item.id}
              handleEditItem={handleEditItem}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Item;
