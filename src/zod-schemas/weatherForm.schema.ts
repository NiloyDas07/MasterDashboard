"use client";

import { z } from "zod";
export const getWeatherFormSchema = z.object({ city: z.string().min(1) });
