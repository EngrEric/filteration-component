import { ChangeEventHandler, FC, useState } from "react";

import Button from "./Button";
import plusIcon from "../../assets/plus.svg";

/**
 * The props for the dropdown component
 */
interface DropdownProps {
  options: Array<string>;
  onSelect: (value: string) => void;
  title: string;
  btnClassName?: string;
}

/**
 * A Custom dropdown component
 */
const Dropdown: FC<DropdownProps> = ({
  options,
  title,
  onSelect,
  btnClassName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  /**
   * Handles the search of options
   * @param event the change event from the input field
   */
  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event): void =>
    setSearchTerm(event.target.value.toLowerCase());

  return (
    <>
      <div className="relative">
        <div className={btnClassName}>
          <Button
            imgSrc={plusIcon}
            filters
            iconLarge
            text={title}
            onClick={toggleDropdown}
          />
        </div>
        {isOpen && (
          <div
            onMouseLeave={() => setIsOpen(false)}
            className="fixed max-h-[300px] overflow-y-scroll transition-all duration-[3000ms] ease-in-out mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
          >
            <input
              onChange={handleSearch}
              className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search items"
            />
            {options
              .filter((item) => item.toLowerCase().includes(searchTerm))
              .map((item, index) => (
                <button
                  key={index}
                  onClick={() => onSelect(item)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  {item}
                </button>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
