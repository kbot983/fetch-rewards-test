import reduxStore from "@/store/index";
import { redirect } from "react-router-dom";
import api from "@/lib/api";

const PER_PAGE = 24;

export const loader = async ({ request }: { request: Request }) => {
  const { isAuthenticated } = reduxStore.getState().auth;

  if (!isAuthenticated) {
    console.log("User is not authenticated");
    return redirect("/login");
  }

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const breeds = searchParams.getAll("breeds[]");
  const page = parseInt(searchParams.get("page") || "1");
  const minAge = parseInt(searchParams.get("ageMin") || "");
  const maxAge = parseInt(searchParams.get("ageMax") || "");

  try {
    // Set default values
    searchParams.set("size", PER_PAGE.toString());
    searchParams.set("sort", searchParams.get("sort") || "breed:asc");

    // Calculate and set 'from' parameter based on page
    if (!isNaN(page)) {
      searchParams.set("from", ((page - 1) * PER_PAGE).toString());
    }

    // Remove page parameter as it's not needed in the API call
    searchParams.delete("page");

    if (breeds.length === 0) {
      searchParams.delete("breeds[]");
    }

    const response = await api.get(`/dogs/search?${searchParams.toString()}`);
    console.log("Response", response.data);
    return { ...response.data, currentPage: page, breeds, minAge, maxAge };
  } catch (error) {
    console.error(error);
    return redirect("/login");
  }
};
