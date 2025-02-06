import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MainPagePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {currentPage != 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  onPageChange(currentPage - 1);
                }}
                className="cursor-pointer"
              />
            </PaginationItem>
            {currentPage - 1 > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      onPageChange(1);
                    }}
                    className="cursor-pointer"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  onPageChange(currentPage - 1);
                }}
                className="cursor-pointer"
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              onPageChange(NaN);
            }}
            isActive
            className="cursor-pointer"
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage != totalPages && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer"
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            {currentPage + 1 < totalPages && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => onPageChange(totalPages)}
                    className="cursor-pointer"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => onPageChange(currentPage + 1)}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              </>
            )}
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default MainPagePagination;
