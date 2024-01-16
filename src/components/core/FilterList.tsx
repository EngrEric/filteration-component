import { useEffect, useRef, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";

import { isOverflown } from "../../utils/helpers";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import rightArrow from "../../assets/right-arrow.svg";
import leftArrow from "../../assets/left-arrow.svg";
import upDownArrow from "../../assets/arrow-down-arrow-up.svg";
import monitorIcon from "../../assets/monitoring.svg";
import closeIcon from "../../assets/close.svg";
import { FilterActionType, FilterSelectionMode, FilterType } from "../constants";
import { FilterContext } from "../../RootContext";

type FilterOption = {
  value: string;
  selected: boolean;
};

// Initial filter options for different filter types
const initialFilters: Record<FilterType, FilterOption[]> = {
  [FilterType.Others]: [
    { value: "Extract", selected: false },
    { value: "Monitor", selected: false }
  ],
  [FilterType.Category]: [
    { value: "Competitive Intelligence", selected: false },
    { value: "SEO", selected: false }
  ],
  [FilterType.Sites]: [
    { value: "Amazon", selected: false },
    { value: "Booking", selected: false },
    { value: "Craigslist", selected: false },
    { value: "Google Maps", selected: false },
    { value: "Google", selected: false },
    { value: "LinkedIn", selected: false },
    { value: "Meetup", selected: false },
    { value: "Pinterest", selected: false },
    { value: "Upwork", selected: false },
    { value: "ProductHunt", selected: false },
    { value: "FDA", selected: false },
    { value: "Trip Advisor", selected: false },
    { value: "Twitter", selected: false }
  ],
  [FilterType.all]: []
};

const FilterList = () => {
  // Using the filter context to access filter-related functions
  const { removeAllFilter, handleFilter } = useContext(FilterContext);

  // State for managing the visibility of the slider button
  const [shouldShowSliderBtn, setShouldShowSliderBtn] = useState(false);

  // State for managing the active filter types
  const [filterTypes, setFilterType] = useState<FilterType>(FilterType.all);

  // State for managing filter options
  const [filters, setFilters] =
    useState<Record<FilterType, FilterOption[]>>(initialFilters);

  // Reference for the scrollable div
  const ref = useRef<HTMLDivElement>(null);

  // Function to scroll the div
  const scroll = useCallback((scrollOffset: number) => {
    ref.current?.scrollBy({ left: scrollOffset, behavior: "smooth" });
  }, []);

  // Function to check if the div is overflowed
  const checkOverflow = useCallback(() => {
    setShouldShowSliderBtn(isOverflown(ref.current));
  }, [ref]);

  // Debounced version of the checkOverflow function
  const debouncedCheckOverflow = debounce(checkOverflow, 300);

  // Function to handle the selection of filter options
  const handleSelect = useCallback(
    (
      type: FilterActionType,
      selectionMode: FilterSelectionMode = "MULTIPLE",
      value: string,
      filterType: FilterType
    ) => {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        updatedFilters[filterType] = updatedFilters[filterType].map((item) => {
          return item.value === value
            ? { ...item, selected: type === "ADD" }
            : selectionMode === "SINGLE"
            ? { ...item, selected: false }
            : item;
        });

        return updatedFilters;
      });

      if (type === "ADD") {
        setFilterType(filterType);
      }
      checkOverflow();
    },
    [checkOverflow]
  );

  // Effect to check for overflow on window resize
  useEffect(() => {
    debouncedCheckOverflow();
    const handleResize = () => {
      debouncedCheckOverflow();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [debouncedCheckOverflow]);

  // Effect to reset filters when removeAllFilter changes
  useEffect(() => {
    if (removeAllFilter) {
      setFilters(initialFilters);
    }
  }, [removeAllFilter]);

  // Effect to update handleFilter when filter state changes
  useEffect(() => {
    const selectedFilters: string[] = [];
    Object.values(filters).forEach((filterList) => {
      selectedFilters.push(
        ...filterList
          .filter((filter) => filter.selected)
          .map((filter) => filter.value)
      );
    });

    if (handleFilter) {
      handleFilter(selectedFilters, filterTypes);
    }
  }, [filters, filterTypes, handleFilter]);

  
  // Render the FilterList component
  return (
    <div className="flex w-full" data-testid="filter-list" >
      {shouldShowSliderBtn && (
        <Button circleBtn imgSrc={leftArrow} onClick={() => scroll(-100)} />
      )}
      <div
        ref={ref}
        className="flex justify-between mx-1 scroll-smooth overflow-x-scroll"
      >
        <Button
          imgSrc={upDownArrow}
          text={"Extract Data"}
          onClick={(status) =>
            handleSelect(
              status ? "ADD" : "REMOVE",
              "MULTIPLE",
              "Extract",
              FilterType.Others
            )
          }
        />
        <Button
          imgSrc={monitorIcon}
          text={"Monitoring"}
          onClick={(status) =>
            handleSelect(
              status ? "ADD" : "REMOVE",
              "MULTIPLE",
              "Monitor",
              FilterType.Others
            )
          }
        />
        {filters[FilterType.Category].map(
          (category, index) =>
            category.selected && (
              <Button
                key={index}
                active={category.selected}
                imgSrc={closeIcon}
                iconLarge
                text={category.value}
                onClick={() =>
                  handleSelect(
                    "REMOVE",
                    "SINGLE",
                    category.value,
                    FilterType.Category
                  )
                }
              />
            )
        )}
        {filters[FilterType.Sites].map(
          (site, index) =>
            site.selected && (
              <Button
                key={index}
                active={site.selected}
                imgSrc={closeIcon}
                iconLarge
                text={site.value}
                onClick={() =>
                  handleSelect(
                    "REMOVE",
                    "MULTIPLE",
                    site.value,
                    FilterType.Sites
                  )
                }
              />
            )
        )}
      </div>

      <Dropdown
        title="Filter by Site"
        btnClassName="md:w-[180px]"
        options={filters[FilterType.Sites]
          .filter((site) => !site.selected)
          .map((site) => site.value)}
        onSelect={(value) =>
          handleSelect("ADD", "MULTIPLE", value, FilterType.Sites)
        }
      />

      <Dropdown
        title="Filter by Category"
        btnClassName="md:w-[220px]"
        options={filters[FilterType.Category]

          .filter((category) => !category.selected)
          .map((category) => category.value)}
        onSelect={(value) =>
          handleSelect("ADD", "SINGLE", value, FilterType.Category)
        }
      />
      {shouldShowSliderBtn && (
        <Button circleBtn imgSrc={rightArrow} onClick={() => scroll(100)} />
      )}
    </div>
  );
};

export default FilterList;
