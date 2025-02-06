import api from "@/lib/api";
import reduxStore from "@/store/index";
import { Match, Dog } from "@/types";

export const loader = async () => {
  const favoriteIds = reduxStore.getState().favorite.favoriteIds;
  try {
    const response = await api.post<Match>("/dogs/match", favoriteIds);
    const dogDetails = await api.post<Dog[]>("/dogs", [response.data.match]);
    return dogDetails.data[0];
  } catch (error) {
    console.error(error);
    return;
  }
};
