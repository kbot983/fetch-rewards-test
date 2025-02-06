import { Button } from "../ui/button";
import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ } from "lucide-react";

interface SortOptionsProps {
  sort: { field: "breed" | "age" | "name"; order: "asc" | "desc" };
  onSortChange: (sort: "breed" | "age" | "name") => void;
}

const SortOptions = ({ sort, onSortChange }: SortOptionsProps) => {
  return (
    <span className="space-x-4 text-sm text-neutral-700">
      Sort By:{" "}
      <Button variant={"outline"} onClick={() => onSortChange("breed")}>
        Breed{" "}
        {sort.field === "breed" &&
          (sort.order === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />)}
      </Button>
      <Button variant={"outline"} onClick={() => onSortChange("age")}>
        Age{" "}
        {sort.field === "age" &&
          (sort.order === "asc" ? <ArrowDown01 /> : <ArrowUp01 />)}
      </Button>
      <Button variant={"outline"} onClick={() => onSortChange("name")}>
        Name{" "}
        {sort.field === "name" &&
          (sort.order === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />)}
      </Button>
    </span>
  );
};

export default SortOptions;
