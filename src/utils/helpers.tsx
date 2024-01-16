import {
  Category,
  Site,
  FilterType,
  ResponseDataObject
} from "../components/constants";

/**
 * A function that checks for overflow
 * @param element the html element
 * @returns
 */
export function isOverflown(element: HTMLElement | null) {
  return element
    ? element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    : false;
}

/**
 * A search function.
 * @param inputArray the filter array of strings
 * @param data the data to be filtered
 */
export function searchDataObjects(
  inputArray: string[],
  data: ResponseDataObject[]
): ResponseDataObject[] {
  return data.filter((obj) => {
    return inputArray.every((item) =>
      obj.title.toLowerCase().includes(item.toLowerCase())
    );
  });
}

/**
 * A function to filter items by given type
 * @param filters The array of the selected filters
 * @param data The data to be filtered
 * @param type The current selected filter type
 */
export function filterByType(
  filters: string[],
  data: ResponseDataObject[],
  type: FilterType
): ResponseDataObject[] {
  // return back the data if the filter array is empty
  if (filters.every((item) => item === "") || type === FilterType.all) {
    return data;
  }
  // search by title if the current filter type is others
  if (type === "others") {
    return searchDataObjects(filters, data);
  }

  // search by filter type
  const foundResult = data.filter((obj: ResponseDataObject) => {
    return obj[type]?.some((item: Category | Site) =>
      filters.some((filter) =>
        filter.toLowerCase().includes(item.title.toLowerCase())
      )
    );
  });

  // expand the search to include object titles if no item is found by type
  if (foundResult.length === 0) {
    return searchDataObjects(filters, data);
  }

  return foundResult;
}
