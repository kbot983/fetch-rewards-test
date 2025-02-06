import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  Sheet,
} from "@/components/ui/sheet";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import api from "@/lib/api";
import { Filter } from "lucide-react";
import { Label } from "./label";

interface DogsFilterProps {
  selectedBreeds: string[];
  minAge: number | undefined;
  maxAge: number | undefined;
  onValueChange: (
    currentBreed: string[],
    minAge: number,
    maxAge: number,
  ) => void;
}

const DogsFilter = ({
  selectedBreeds: initialSelectedBreeds,
  minAge: initialMinAge,
  maxAge: initialMaxAge,
  onValueChange,
}: DogsFilterProps) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(
    initialSelectedBreeds,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [minAge, setMinAge] = useState<number | undefined>(initialMinAge);
  const [maxAge, setMaxAge] = useState<number | undefined>(initialMaxAge);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await api.get(`/dogs/breeds`);
        setBreeds(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBreeds();
  }, []);

  const handleSetValue = (newValue: string) => {
    const updatedBreeds = selectedBreeds.includes(newValue)
      ? selectedBreeds.filter((breed) => breed !== newValue)
      : [...selectedBreeds, newValue];
    setSelectedBreeds(updatedBreeds);
  };

  const handleSaveChanges = () => {
    onValueChange(selectedBreeds, minAge ?? 0, maxAge ?? 0);
  };

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="w-full md:w-auto">
          <Filter /> Filter
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <h2 className="text-lg font-semibold">Breeds</h2>
          <Input
            type="text"
            placeholder="Search breeds"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded border p-2"
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredBreeds.map((breed) => (
              <div key={breed} className="flex items-center">
                <Checkbox
                  id={breed}
                  checked={selectedBreeds.includes(breed)}
                  onCheckedChange={() => handleSetValue(breed)}
                  className="mr-2 text-primary"
                />
                <label htmlFor={breed}>{breed}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <h2 className="text-lg font-semibold">Age</h2>
          <div className="space-y-2">
            <Label htmlFor="minAge">Minimum Age</Label>
            <Input
              type="number"
              id="minAge"
              placeholder="Min age"
              min={0}
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="w-full"
            />
            <Label htmlFor="maxAge">Maximum Age</Label>
            <Input
              type="number"
              id="maxAge"
              placeholder="Max age"
              min={0}
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSaveChanges}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DogsFilter;
