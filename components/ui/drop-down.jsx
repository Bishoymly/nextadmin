import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";

export default function DropDown({ form, field, items, ...props }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between w-[300px]",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? items.find((item) => item === field.value) : "Select"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-72">
              {items.map((item) => (
                <CommandItem
                  value={item}
                  key={item}
                  onSelect={() => {
                    form.setValue(field.name, item);
                  }}
                >
                  {item}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      item === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
