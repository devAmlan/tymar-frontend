"use client";
import React from "react";
import { CheckIcon, ChevronDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import _ from "lodash";


function MultiSelect(props:any) {
    const { options, toggleOptions, selectedOptions, removeOption } = props;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto">
          <div className="flex items-center justify-between w-full mx-auto">
            <span className="text-sm text-muted-foreground mx-3 flex justify-start items-center flex-wrap gap-1">
              {_.isEmpty(selectedOptions)
                ? "Select Team Members"
                : _.map(_.slice(selectedOptions, 0, 3), (item:any) => (
                    <span
                      key={item?._id}
                      className="bg-primary text-white px-3 py-1 border-0 rounded-full flex justify-between items-center gap-2"
                    >
                      {item?.name}
                      <X
                        className="size-4"
                        onClick={() => removeOption(item)}
                      />
                    </span>
                  ))}
              {_.size(selectedOptions) > 3 && (
                <span className="bg-primary text-white px-2 py-1 border-0 rounded-full flex justify-between items-center gap-2">
                  +{_.size(selectedOptions) - 3} more
                </span>
              )}
            </span>
            <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-52">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Team Members">
              {_.map(options, (item:any) => {
                const isSelected = _.some(
                  selectedOptions,
                  (member:any) => member?._id === item?._id
                );

                return (
                  <CommandItem
                    key={item?._id}
                    onSelect={() => toggleOptions(item)}
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-black  ${
                        isSelected
                          ? "bg-black text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      }`}
                    >
                      <CheckIcon className="size-4" />
                    </div>
                    <span>{item?.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MultiSelect