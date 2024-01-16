import { useCallback, useState } from "react";
import CardList from "./components/core/CardList";
import { filterByType } from "./utils/helpers";
import {
  FilterType,
  ResponseDataObject,
  sampleResponseData
} from "./components/constants";
import { FilterContext } from "./RootContext";

function App() {
  const responseData = sampleResponseData.data.oneClickAutomations.items;
  const [data, setData] = useState<ResponseDataObject[]>(responseData);
  const [removeAllFilter, setRemoveAllFilter] = useState<boolean>(false);

  const handleFilter = useCallback(
    (filters: Array<string>, filterTypes: FilterType) => {
      const filteredData = filterByType(filters, responseData, filterTypes);

      setData(filteredData);
      setRemoveAllFilter(filterTypes === FilterType.all);
    },
    [responseData]
  );

  return (
    <FilterContext.Provider value={{ data, handleFilter, removeAllFilter }}>
      <div className="md:max-w-[70vw] md:mx-auto mx-6">
        <div className="flex my-10 items-center justify-between">
          <p className="text-gray-500">
            Here are some Automations that pre-defined for product availability
            monitoring:
          </p>
          <button
            onClick={() => handleFilter([], FilterType.all)}
            className="btn btn-link"
          >
            See all
          </button>
        </div>
        <CardList />
      </div>
    </FilterContext.Provider>
  );
}

export default App;

