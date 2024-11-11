import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addTaskSchema } from "@/zod-schemas/kanbanForms.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { UniqueIdentifier } from "@dnd-kit/core";
import { DNDItemsType } from "../types/kanbanTypes";

interface Props {
  handleEditItem: (
    columnId: UniqueIdentifier,
    itemId: UniqueIdentifier,
    task: DNDItemsType
  ) => void;
  columnId: UniqueIdentifier;
  itemId: UniqueIdentifier;
}

const EditTaskForm: React.FC<Props> = ({
  handleEditItem,
  columnId,
  itemId,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
    },
  });

  const handleSubmit = (data: z.infer<typeof addTaskSchema>) => {
    console.log(data);
    const updatedTask = {
      id: itemId,
      title: data.title,
      description: data.description,
      dueDate: date ?? new Date(),
    };

    handleEditItem(columnId, itemId, updatedTask);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between sm:gap-4 sm:flex-row sm:items-center">
              <FormLabel className="sm:text-right text-lg mt-2">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Task title "
                  className="sm:w-9/12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between sm:gap-4 sm:flex-row sm:items-center">
              <FormLabel className="sm:text-right text-lg mt-2">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Task description"
                  className="sm:w-9/12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:gap-4 sm:flex-row sm:items-center justify-between">
              <FormLabel className="sm:text-right text-lg mt-2">
                Due Date
              </FormLabel>
              <FormControl>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="sm:w-9/12 shadow-all-directions rounded-md border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 ml-auto flex justify-end gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditTaskForm;
