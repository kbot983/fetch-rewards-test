import DogsFilter from "@/components/ui/DogsFilter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DogsList from "@/components/ui/DogsList";
import FavoritesList from "@/components/ui/FavoritesList";
import { RootState } from "@/store";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import MainPagePagination from "@/components/Mainpage/Pagination";
import SortOptions from "@/components/Mainpage/SortOptions";
import SearchBox from "@/components/Mainpage/SearchBox";

interface DogsSearchRes {
  resultIds: string[];
  total: number;
  currentPage: number;
  breeds?: string[];
  minAge?: number;
  maxAge?: number;
}

const PER_PAGE = 24;

const MainPage = () => {
  const { resultIds, total, currentPage, breeds, minAge, maxAge } =
    useLoaderData<DogsSearchRes>();
  const totalPages = Math.ceil(total / PER_PAGE);
  const navigate = useNavigate();
  const [sort, setSort] = useState<{
    field: "breed" | "age" | "name";
    order: "asc" | "desc";
  }>({ field: "breed", order: "asc" });

  const favorites = useSelector(
    (state: RootState) => state.favorite.favoriteIds,
  );

  const handleFilterChange = (
    currentBreed: string[],
    minAge: number,
    maxAge: number,
  ) => {
    const currentParams = new URLSearchParams(window.location.search);
    const searchParams = new URLSearchParams();
    if (currentParams.getAll("zipCodes[]").length > 0) {
      currentParams
        .getAll("zipCodes[]")
        .forEach((zip) => searchParams.append("zipCodes[]", zip));
    }

    currentBreed.forEach((breed) => searchParams.append("breeds[]", breed));
    searchParams.set("page", "1");
    if (minAge) searchParams.set("ageMin", minAge.toString());
    if (maxAge) searchParams.set("ageMax", maxAge.toString());
    if (sort) searchParams.set("sort", `${sort.field}:${sort.order}`);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handlePagination = (page: number) => {
    if (isNaN(page)) return;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page.toString());
    navigate(`?${searchParams.toString()}`, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSort = (field: "breed" | "age" | "name") => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", "1");

    if (sort.field === field && sort.order === "asc") {
      searchParams.set("sort", `${field}:desc`);
      setSort({ field, order: "desc" });
    } else {
      searchParams.set("sort", `${field}:asc`);
      setSort({ field, order: "asc" });
    }
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleZipCodeChange = useCallback(
    (zipCodes: string[]) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", "1");
      searchParams.delete("zipCodes[]");
      searchParams.delete("zipCode");
      if (zipCodes.length === 0) {
        searchParams.set("zipCode", "not-found");
      } else {
        zipCodes.forEach((zip) => searchParams.append("zipCodes[]", zip));
      }
      navigate(`?${searchParams.toString()}`, { replace: true });
    },
    [navigate],
  );

  return (
    <>
      <div className="flex min-h-[20vh] flex-col items-center justify-center bg-gradient-to-r from-secondary/50 to-secondary/85 p-4 text-primary md:p-8">
        <h1 className="text-center font-medium">Find your new best friend</h1>
        <p className="mt-2 text-center text-neutral-700">
          Browse through our selection of dogs and favorite the ones you like.
          When you're ready, we will help you find the perfect match.
        </p>
        <SearchBox
          className="container mt-4 max-w-xl"
          onZipCodeChange={handleZipCodeChange}
        />
      </div>
      <div className="p-4 md:p-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
            <div className="flex-1">
              <DogsFilter
                selectedBreeds={breeds || []}
                minAge={minAge}
                maxAge={maxAge}
                onValueChange={handleFilterChange}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  Favorites{" "}
                  <span className="inline-block h-6 w-6 rounded-full bg-primary p-1 text-xs text-white">
                    {favorites.length}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-[1200px] overflow-y-auto">
                <div className="relative">
                  <DialogHeader>
                    <DialogTitle className="font-secondary text-primary">
                      Favorites
                    </DialogTitle>
                    <DialogDescription>
                      <FavoritesList />
                    </DialogDescription>
                  </DialogHeader>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => navigate("/matches")}
              className="h-9 w-full md:w-auto"
              disabled={favorites.length === 0}
            >
              Im Ready!
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-start gap-y-4 md:flex-nowrap">
            <div className="space-y-2">
              <SortOptions sort={sort} onSortChange={handleSort} />
              <div>
                <span className="text-primary">
                  Showing {resultIds.length} of {total} dogs
                </span>
                <span className="text-neutral-700">
                  {" "}
                  - Page {currentPage} of {totalPages !== 0 ? totalPages : 1}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-2 md:ml-auto md:w-auto">
              {breeds?.map((breed) => (
                <div
                  key={breed}
                  className="rounded-full bg-secondary px-3 py-1 text-sm"
                >
                  Breed: {breed}
                </div>
              ))}
              {typeof minAge === "number" && !isNaN(minAge) && (
                <div className="rounded-full bg-secondary px-3 py-1 text-sm">
                  Min Age: {minAge}
                </div>
              )}
              {typeof maxAge === "number" && !isNaN(maxAge) && (
                <div className="rounded-full bg-secondary px-3 py-1 text-sm">
                  Max Age: {maxAge}
                </div>
              )}
            </div>
          </div>
          {resultIds.length > 0 && (
            <>
              <DogsList dogs={resultIds} />
              <MainPagePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePagination}
              />
            </>
          )}
          {resultIds.length === 0 && (
            <div className="flex h-[200px] items-center justify-center text-center font-bold text-primary">
              No dogs found. Please try again with different filters.
            </div>
          )}
          <Button
            onClick={() => navigate("/matches")}
            className="mt-8 w-full"
            disabled={favorites.length === 0}
          >
            Im Ready!
          </Button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
