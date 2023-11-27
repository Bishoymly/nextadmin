"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import display from "@/lib/types/display";
import zodSchema from "@/lib/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { DatePicker } from "./ui/date-picker";
import { startTransition, useTransition } from "react";
import SaveButton from "./save-button";
import { useRouter } from "next/navigation";
import renderFormControl from "@/lib/types/render-form-control";

export default function FormComponent({ typeName, item, type, formAction }) {
  const router = useRouter();
  const schema = zodSchema(type);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
    values: item,
    mode: "onChange",
  });

  async function onSubmit(data) {
    await startTransition(async () => {
      await formAction(typeName, data);
    });

    router.push(`/admin/${typeName}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action={formAction}
        className="space-y-4"
      >
        {Object.entries(type.properties ?? {}).map(([name, p]) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{display(name)}</FormLabel>
                <FormControl>{renderFormControl(p, field, item)}</FormControl>
                <FormDescription>{p.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <SaveButton />
        <Link href={`/admin/${typeName}`}>
          <Button variant="outline" className="ml-2">
            Cancel
          </Button>
        </Link>
      </form>
    </Form>
  );
}
