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
import { cn } from "@/lib/utils";

export default function FormObject({ className, form, prefix, item, type }) {
  return (
    <div className={cn("space-y-4", className)}>
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
    </div>
  );
}
