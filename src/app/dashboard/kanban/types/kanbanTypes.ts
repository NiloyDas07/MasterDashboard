import { UniqueIdentifier } from "@dnd-kit/core";

export type DNDItemsType = {
  id: UniqueIdentifier;
  title: string;
  description: string;
  dueDate: Date;
};

export type DNDColumnsType = {
  id: UniqueIdentifier;
  title: string;
  items: DNDItemsType[];
};
