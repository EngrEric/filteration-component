import { useContext } from "react";
import Card from "./Card";
import FilterList from "./FilterList";
import { FilterContext } from "../../RootContext";

const CardList = () => {
    const {data} = useContext(FilterContext)

  return (
    <div>
      <FilterList />
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 xl:gap-10 md:gap-5 gap-2 mt-10">
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            subTitle={item.shortDescription}
            logoUrl={item.sites[0].logoSmall2x}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
