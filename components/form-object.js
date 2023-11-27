"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import display from "@/lib/types/display";
import renderFormControl from "@/lib/types/render-form-control";
import { Card } from "./ui/card";

export default function FormObject({ form, prefix, item, type }) {
  return (
    <Card className="space-y-4 p-8">
      {Object.entries(type.properties ?? {}).map(([name, p]) => (
        <FormField
          key={prefix + name}
          name={prefix + name}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{display(name)}</FormLabel>
              <FormControl>
                {renderFormControl(form, p, field, item)}
              </FormControl>
              <FormDescription>{p.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </Card>
  );
}
