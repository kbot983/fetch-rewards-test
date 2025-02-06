import reduxStore from "@/store/index";
import { redirect } from "react-router-dom";

export const loader = () => {
  const { isAuthenticated } = reduxStore.getState().auth;
  if (isAuthenticated) {
    return redirect("/");
  }
  return new Response(null, { status: 200 });
};
