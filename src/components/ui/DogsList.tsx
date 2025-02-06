import api from "@/lib/api";
import { Dog } from "@/types";
import { useEffect, useState } from "react";
import DogCard from "./DogCard";

const DogsList = ({ dogs }: { dogs: string[] }) => {
  const [dogsList, setDogsList] = useState<Dog[]>([]);
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await api.post(`/dogs`, dogs);
        setDogsList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDogs();
  }, [dogs]);

  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dogsList.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};
export default DogsList;
