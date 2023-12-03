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
import { Button } from "./ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import newFromType from "@/lib/types/new-from-type";
import { useFieldArray } from "react-hook-form";

export default function FormArray({ form, prefix, data, type }) {
  const { fields, append, remove } = useFieldArray({
    name: prefix,
    control: form.control,
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row space-x-4">
          <div className="flex-1">
            {renderFormControl(form, type, field, {})}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-none h-8"
            onClick={remove}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 px-2 lg:px-3"
        onClick={append}
      >
        Add
        <PlusIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
