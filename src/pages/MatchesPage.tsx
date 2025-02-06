import { Dog } from "@/types";
import { useLoaderData } from "react-router-dom";

const MatchesPage = () => {
  const { name, img, age, breed, zip_code } = useLoaderData<Dog>();
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-secondary/50 to-secondary/85">
      <div className="container mx-4 grid min-h-[80vh] grid-rows-2 rounded-lg bg-white shadow-md md:mx-8 md:grid-cols-2 md:grid-rows-1">
        <img
          src={img}
          alt={name}
          className="aspect-square h-full w-full rounded-tl-lg rounded-tr-lg object-cover md:aspect-auto md:rounded-r-none md:rounded-bl-lg"
        />
        <div className="flex flex-col justify-center p-4 text-primary">
          <h1>Congratulations!</h1>
          <p className="mt-4 text-xl">We have found your new best friend!</p>
          <p className="mt-4">
            <p>
              <span className="font-bold">Name:</span> {name}
            </p>
            <p>
              <span className="font-bold">Age:</span> {age} years
            </p>
            <p>
              <span className="font-bold">Breed:</span> {breed}
            </p>
            <p>
              <span className="font-bold">Zip Code:</span> {zip_code}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};
export default MatchesPage;
