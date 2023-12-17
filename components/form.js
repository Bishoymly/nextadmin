"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import zodSchema from "@/lib/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { startTransition } from "react";
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
        {renderFormControl(form, type, {}, item)}

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
