"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeatherFormSchema } from "@/zod-schemas/weatherForm.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import WeatherCard from "./WeatherCard";
import { Loader2, RefreshCcw } from "lucide-react";

const WeatherSection: React.FC = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof getWeatherFormSchema>>({
    resolver: zodResolver(getWeatherFormSchema),
    defaultValues: {
      city: "",
    },
  });

  const onSubmit = (data: z.infer<typeof getWeatherFormSchema>) => {
    setLoading(true);
    setCity(data.city);
    form.reset();
  };

  return (
    <section className="p-4 lg:h-auto" aria-label="Weather Section">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-heading-foreground font-bold tracking-wide text-2xl">
            How's the weather today?
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 h-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-2"
            >
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="sr-only">
                      Enter your city name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your city name"
                        {...field}
                      ></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">
                Get Weather{" "}
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              </Button>
            </form>
          </Form>

          <WeatherCard city={city} setLoading={setLoading} />
        </CardContent>
      </Card>
    </section>
  );
};

export default WeatherSection;
