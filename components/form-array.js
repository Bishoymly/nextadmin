"use client";
import { Button } from "./ui/button";
import { Edit2Icon, PenSquare, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { DataTable } from "./ui/data-table";
import getGridColumns from "./data-table/columns/get-grid-columns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import renderFormControl from "@/lib/types/render-form-control";
import zodSchema from "@/lib/types/zod-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FormArray({ form, field, data, type, typeName }) {
  const [items, setItems] = useState(data);
  const [item, setItem] = useState({});
  const [dialogHeader, setDialogHeader] = useState("Add");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const schema = zodSchema(type);
  const subForm = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
    values: item,
    mode: "onChange",
  });
  let columns = getGridColumns(type, typeName, items, () => {}, {
    selectColumn: false,
    actionsColumn: false,
    makeFirstColumnClickable: false,
  });
  columns.push({
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <Button variant="ghost" size="sm">
            <PenSquare
              className="h-4 w-4"
              onClick={() => {
                setDialogHeader("Edit");
                setItem(row.original);
                setIsDialogOpen(true);
              }}
            />
          </Button>
          <Button variant="ghost" size="sm">
            <XIcon
              className="h-4 w-4"
              onClick={() => {
                setValues(items.filter((i) => i != row.original));
              }}
            />
          </Button>
        </>
      );
    },
  });

  function setValues(values) {
    form.setValue(field.name, values);
    setItems(values);
  }

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={items} />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 px-2 lg:px-3"
        onClick={() => {
          setDialogHeader("Add");
          setItem({});
          setIsDialogOpen(true);
        }}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Add
      </Button>
      <Dialog open={isDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogHeader}</DialogTitle>
          </DialogHeader>
          {renderFormControl(subForm, type, {}, item)}
          {subForm.formState.errors &&
            Object.keys(subForm.formState.errors).length > 0 && (
              <div>
                {Object.entries(subForm.formState.errors).map(
                  ([field, error]) => (
                    <p className="text-sm text-red-500" key={field}>
                      {field}: {error.message}
                    </p>
                  )
                )}
              </div>
            )}
          <DialogFooter>
            <Button
              onClick={() => {
                subForm.trigger().then((isValid) => {
                  if (isValid) {
                    if (dialogHeader == "Add") {
                      setValues([...items, subForm.getValues()]);
                    } else {
                      setValues(
                        items.map((i) => (i == item ? subForm.getValues() : i))
                      );
                    }
                    setIsDialogOpen(false);
                  }
                });
              }}
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
