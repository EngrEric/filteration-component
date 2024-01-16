import { FilterType, ResponseDataObject } from "../../components/constants";
import { filterByType, isOverflown, searchDataObjects } from "../helpers";

const mockCategories = [{ slug: "seo", title: "seo" }];
const mockSites = [
  {
    domains: ["google"],
    logoSmall2x: "url",
    slug: "google",
    title: "google"
  }
];

describe("isOverflown", () => {
  test("should return true when element is overflown vertically", () => {
    const elementMock: Partial<HTMLElement> = {
      scrollHeight: 100,
      clientHeight: 50
    };
    const result = isOverflown(elementMock as HTMLElement);
    expect(result).toBe(true);
  });

  test("should return true when element is overflown horizontally", () => {
    const elementMock: Partial<HTMLElement> = {
      scrollWidth: 100,
      clientWidth: 50
    };
    const result = isOverflown(elementMock as HTMLElement);
    expect(result).toBe(true);
  });

  test("should return false when element is not overflown", () => {
    const elementMock: Partial<HTMLElement> = {
      scrollHeight: 50,
      clientHeight: 100,
      scrollWidth: 50,
      clientWidth: 100
    };
    const result = isOverflown(elementMock as HTMLElement);
    expect(result).toBe(false);
  });

  test("should return false when element is null", () => {
    const result = isOverflown(null);
    expect(result).toBe(false);
  });
});

describe("searchDataObjects", () => {
  const data: ResponseDataObject[] = [
    {
      title: "Google 1",
      categories: mockCategories,
      id: "1",
      priority: 10,
      shortDescription: "some short des",
      slug: "google",
      sites: mockSites
    }
  ];

  test("should filter data based on inputArray", () => {
    const inputArray = ["Google"];
    const result = searchDataObjects(inputArray, data);
    expect(result).toEqual(data);
  });

  test("should be case-insensitive", () => {
    const inputArray = ["google"];
    const result = searchDataObjects(inputArray, data);
    expect(result).toEqual(data);
  });

  test("should return all data if inputArray is empty", () => {
    const inputArray: string[] = [];
    const result = searchDataObjects(inputArray, data);
    expect(result).toEqual(data);
  });
});

describe("filterByType", () => {
  const data = [
    { title: "Item others", categories: mockCategories, sites: mockSites },
    {
      title: "Item 2",
      categories: [{ slug: "sample", title: "sample" }],
      site: mockSites
    },
    {
      title: "Item 3",
      categories: [{ slug: "examplee", title: "examplee" }],
      site: mockSites
    }
  ] as ResponseDataObject[];

  test("should return all data if filters are empty and type is all", () => {
    const filters: string[] = [];
    const result = filterByType(filters, data, FilterType.all);
    expect(result).toEqual(data);
  });

  test("should filter data by title if type is others", () => {
    const filters = ["others"];
    const result = filterByType(filters, data, FilterType.Others);
    
    expect(result[0].title).toEqual("Item others");
  });

  test("should filter data by filter type", () => {
    const filters = ["sample"];
    const result = filterByType(filters, data, FilterType.Category);
    expect(result).toEqual([
      {
        title: "Item 2",
        categories: [{ slug: "sample", title: "sample" }],
        site: mockSites
      }
    ]);
  });

  test.only("should expand search to include object titles if no item is found by type", () => {
    const mockResponseData = [
        { title: "nonexistent others", categories: mockCategories, sites: mockSites }
    ] as ResponseDataObject[]
    const filters = ["nonexistent"];
    const result = filterByType(filters, mockResponseData, FilterType.Sites);
    expect(result).toEqual(mockResponseData);
  });
});
