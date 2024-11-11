import { Card } from "@/components/ui/card";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface Props {
  id: UniqueIdentifier;
  title: string;
}

const Item: React.FC<Props> = ({ id, title }) => {
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
      type: "item",
    },
  });

  return <Card ref={setNodeRef} {...attributes} style={{ transition, transform: CSS.Translate.toString(transform) }}>

  </Card>;
};

export default Item;
