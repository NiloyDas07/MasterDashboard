"use client";

import { z } from "zod";

const addTaskSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  dueDate: z.date(),
});

const editTaskSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  dueDate: z.date(),
});

export { addTaskSchema, editTaskSchema };
