import { RootState } from "@/store";
import { useSelector } from "react-redux";
import DogsList from "./DogsList";

const FavoritesList = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorite.favoriteIds,
  );

  if (favorites.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-center font-bold text-primary">
        No favorites yet
      </div>
    );
  }

  return <DogsList dogs={favorites} />;
};

export default FavoritesList;
