import { useState, useRef, useEffect } from "react";
import {
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from "../ui/command";
import api from "@/lib/api";
import { Location } from "@/types";

interface SearchBoxProps {
  className: string;
  onZipCodeChange: (zipCodes: string[]) => void;
}

const SearchBox = ({ className, onZipCodeChange }: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    } else {
      console.error("Google Maps Places API is not loaded.");
    }
  }, []);
  useEffect(() => {
    if (!inputValue || !autocompleteService.current) {
      setSuggestions([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: inputValue,
        types: ["(cities)"],
        componentRestrictions: { country: "us" },
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const updatedPredictions = (predictions || []).map((prediction) => ({
            ...prediction,
            description: prediction.description.replace(", USA", ""),
          }));
          setSuggestions(updatedPredictions || []);
        } else {
          console.error("AutocompleteService request failed:", status);
          setSuggestions([]);
        }
      },
    );
  }, [inputValue]);

  // Handle Zip Code fetch
  useEffect(() => {
    const fetchZipCodes = async () => {
      console.log("Selected Location", selectedLocation);
      if (selectedLocation.split(", ").length !== 2) return;

      const [city, state] = selectedLocation.split(", ");
      try {
        const response = await api.post("/locations/search", {
          city,
          "states[]": state,
          size: 10000,
        });
        const zipCodes = response.data.results.reduce(
          (acc: string[], location: Location) =>
            location.city === city && location.state === state
              ? [...acc, location.zip_code]
              : acc,
          [],
        );
        onZipCodeChange(zipCodes);
      } catch (error) {
        console.error("Error fetching zip codes", error);
        setIsError(true);
      }
    };

    if (selectedLocation.includes(", ")) {
      fetchZipCodes();
    }
  }, [selectedLocation, onZipCodeChange]);

  return (
    <div className={`relative ${className}}`}>
      <Command shouldFilter={false}>
        <CommandList>
          <CommandInput
            value={inputValue}
            placeholder="Search your city..."
            className="h-9"
            onValueChange={(value) => {
              setInputValue(value);
              setHideSuggestions(false);
            }}
          />
          {suggestions.length === 0 && inputValue && (
            <CommandEmpty className="z-9 absolute top-10 flex w-full items-center justify-center rounded-md bg-white p-4 shadow-md">
              No places found.
            </CommandEmpty>
          )}

          {isError && (
            <CommandGroup className="z-9 absolute top-10 flex w-full items-center justify-center rounded-md bg-white p-4 shadow-md">
              Soemthing went wrong with the city. Please try again.
            </CommandGroup>
          )}

          {suggestions.length > 0 && !hideSuggestions && (
            <CommandGroup className="absolute top-10 z-10 w-full rounded-md bg-white shadow-md">
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.place_id}
                  value={suggestion.description}
                  onSelect={(value) => {
                    setInputValue(value);
                    setSelectedLocation(value);
                    setHideSuggestions(true);
                  }}
                >
                  {suggestion.description}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchBox;
