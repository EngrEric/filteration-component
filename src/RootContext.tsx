import { createContext } from "react";
import { FilterType, ResponseDataObject, sampleResponseData } from "./components/constants";

export const FilterContext = createContext<{
    data: ResponseDataObject[];
    handleFilter?: (filters: Array<string>, filterTypes: FilterType) => void;
    removeAllFilter?: boolean
  }>({ data: sampleResponseData.data.oneClickAutomations.items });
  