import { Card } from "@/components/ui/card";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title: string;
  description: string;
  onAddItem: () => void;
}

const ColumnCard: React.FC<Props> = ({
  id,
  children,
  title,
  description,
  onAddItem,
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

  return (
    <Card
      {...attributes}
      ref={setNodeRef}
      style={{ transition, transform: CSS.Translate.toString(transform) }}
    ></Card>
  );
};

export default ColumnCard;
