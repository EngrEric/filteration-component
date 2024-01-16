import { FC, useState } from "react";
import classNames from "classnames";

/**
 *The button props
 */
interface ButtonProps {
  imgSrc?: string;
  text?: string;
  circleBtn?: boolean;
  filterBtn?: boolean;
  iconSmall?: boolean;
  iconLarge?: boolean;
  iconXlarge?: boolean;
  filters?: boolean;
  active?: boolean;
  onClick: (status?: boolean) => void;
}

/**
 * Custom button component
 */
const Button: FC<ButtonProps> = ({
  imgSrc,
  onClick,
  text = "",
  circleBtn,
  filterBtn = true,
  iconSmall = true,
  iconLarge,
  iconXlarge,
  filters,
  active,
}) => {
  const [isActive, setIsActive] = useState(active || false);

  /**
   * Handle the click of the filter buttons
   */
  function handleClick() {
    setIsActive(!isActive);
    onClick(!isActive);
  }

  /**
   * generate the button classname based on the state of the filteration
   */
  const btnClass = classNames(
    "btn btn-sm border-gray-400 bg-white text-gray-500 md:mx-3 mx-1",
    {
      "bg-purple-300 border-purple-600 text-purple-700":
        isActive && !circleBtn && !filters,
      "btn-circle": circleBtn,
      "rounded-full": filterBtn
    }
  );

  return (
    <button data-testid="toggle-btn" onClick={handleClick} className={btnClass}>
      {imgSrc ? (
        <img
        alt="button icon"
          className={classNames({
            "hidden md:block": filters,
            "md:w-4 w-2": iconSmall,
            "md:w-7 w-2": iconLarge,
            "md:w-10 w-2": iconXlarge
          })}
          src={imgSrc}
        />
      ) : (
        ""
      )}
      <span className="md:text-sm text-xs text-ellipsis max-w-10 md:whitespace-normal whitespace-nowrap sm:max-w-[200px] overflow-hidden">{text}</span>
    </button>
  );
};

export default Button;
