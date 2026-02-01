"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cubes = [
  { id: "222", label: "2x2" },
  { id: "333", label: "3x3" },
  { id: "444", label: "4x4" },
  { id: "555", label: "5x5" },
  { id: "pyram", label: "Pyraminx" },
  { id: "skewb", label: "Skewb" },
  { id: "minx", label: "Megaminx" },
];

export default function CubeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a cube" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cubes</SelectLabel>
          <SelectItem value="222">2x2</SelectItem>
          <SelectItem value="333">3x3</SelectItem>
          <SelectItem value="444">4x4</SelectItem>
          <SelectItem value="555">5x5</SelectItem>
          <SelectItem value="pyram">Pyraminx</SelectItem>
          <SelectItem value="skewb">Skewb</SelectItem>
          <SelectItem value="minx">Megaminx</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
