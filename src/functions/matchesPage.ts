import api from "@/lib/api";
import reduxStore from "@/store/index";
import { Match, Dog } from "@/types";
import { redirect } from "react-router-dom";

export const loader = async () => {
  if (!reduxStore.getState().auth.isAuthenticated) {
    return redirect("/login");
  }
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
