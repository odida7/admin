"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  categories: CategoryType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  categories,
  value,
  onChange,
  onRemove,
}) => {

  const [open, setOpen] = useState(false);

  //  console.log("value", value);

  const handleToggle = () => {
    setOpen(!open); // Close the dropdown
  };

  let selected: CategoryType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      categories.find((c) => c._id === id)
    ) as CategoryType[];
  }

  const selectables = categories.filter((c)=>!selected.includes(c))

  return (
    <div className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((c) => (
          <Badge key={c._id}>
            {c.title}
            <button 
              className="ml-1 hover:text-red-500"
              onClick={()=>onRemove(c._id)}
            >
              <X className="h-3 w-3"/>
            </button>
            </Badge>
        ))}

        <input
          onClick={handleToggle}
          placeholder={placeholder}
          className="outline-none w-full  py-2 px-4 "
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <ul className="absolute w-full z-10 top-0 overflow-auto border rounded shadow-md">
            {selectables.map((category) => (
              <li
                key={category._id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onChange(category._id)}
                className="p-1 hover:bg-gray-200"
              >
                {category.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
