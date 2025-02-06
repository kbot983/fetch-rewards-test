import { Dog } from "@/types";
import { HeartIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/store/favoriteSlice";
import { RootState } from "@/store";

const DogCard = ({ dog }: { dog: Dog }) => {
  const { img, name, breed, age, id } = dog;
  const dispatch = useDispatch();
  const favoriteIds = useSelector(
    (state: RootState) => state.favorite.favoriteIds,
  );

  const handleLike = () => {
    if (favoriteIds.includes(id)) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
      <div
        className="absolute right-2 top-2 cursor-pointer rounded-full bg-white p-2 shadow-md"
        onClick={handleLike}
      >
        <HeartIcon
          className="h-6 w-6"
          fill={favoriteIds.includes(id) ? "rgb(239 68 68)" : "none"}
          stroke={
            favoriteIds.includes(id) ? "rgb(239 68 68)" : "rgb(107 114 128)"
          }
        />
      </div>
      <img src={img} alt={name} className="aspect-square w-full object-cover" />
      <div className="p-4">
        <span className="font-secondary text-lg font-semibold text-primary">
          {name}
        </span>
        <span className="block text-sm text-primary">
          <span className="font-bold text-secondary">Breed:</span> {breed}
        </span>
        <span className="block text-sm text-primary">
          <span className="font-bold text-secondary">Age:</span> {age}
        </span>
      </div>
    </div>
  );
};

export default DogCard;
