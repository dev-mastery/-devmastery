import {
  mustBeGreaterThanZero,
  mustBeAWholeNumber,
  mustNotBeNull,
} from "../../lib/guard";

export interface PagedResult<T> {
  pages: { [pageNumber: number]: T[] };
  totalPages: number;
  maxPerPage: number;
  count: number;
}

export function paginate<T>({
  list,
  maxPerPage,
}: {
  list: T[];
  maxPerPage: number;
}): PagedResult<T> {
  mustBeGreaterThanZero({ label: "Page Size", value: maxPerPage });
  mustBeAWholeNumber("Page Size", maxPerPage);
  mustNotBeNull("List", list);

  const initialResult: PagedResult<T> = {
    totalPages: 0,
    maxPerPage,
    count: list.length,
    pages: {},
  };

  if (list.length < 1) {
    return initialResult;
  }

  return list.reduce((pagedResult, item, index) => {
    const currentPage = Math.floor(index / maxPerPage) + 1;
    if (!pagedResult.pages[currentPage]) {
      pagedResult.totalPages++;
      pagedResult.pages[currentPage] = [];
    }
    pagedResult.pages[currentPage].push(item);
    return pagedResult;
  }, initialResult);
}
