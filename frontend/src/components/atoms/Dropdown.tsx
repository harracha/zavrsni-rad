import classNames from "classnames";
import { FocusEventHandler, useRef, useState } from "react";

const Dropdown = <T extends string[]>({
  options,
  onChange,
  placeholder,
  label,
  disabled,
  error,
  errorMessage,
  className,
  defaultValue,
}: {
  options: T;
  //TODO!
  onChange: (e: T[number]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  defaultValue?: T[number];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    defaultValue ? options.indexOf(defaultValue) : null
  );

  const dropdownButtonRef = useRef<HTMLDivElement>(null);

  const handleBlur: FocusEventHandler = (event) => {
    const currentTarget = event.currentTarget;
    const relatedTarget = event.relatedTarget;

    // Check if the related target exists and is a descendant of the current component
    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return; // Do nothing if focus jumps to a child element
    }

    setIsOpen(false); // Close the component if focus jumps outside of it
  };

  const handleOptionClick = (newIndex: number) => {
    setSelectedIndex(newIndex);
    setIsOpen(false);
    onChange(options[newIndex]);
  };

  return (
    <div
      className={classNames(
        "flex flex-col w-full gap-1 relative bg-white",
        className
      )}
    >
      {label && <div className="caption text-neutral-strong">{label}</div>}

      {/* Dropdown Body */}
      <div
        className={classNames(
          "w-full duration-100 hover:duration-0 input bg-inherit group",
          !isOpen
            ? "rounded-md border-[0.5px]"
            : "rounded-t-md border-[0.5px] border-b-black",
          disabled && "border-transparent",
          !error &&
            "border-neutral-medium hover:border-neutral-strong active:border-neutral",
          error &&
            "border-danger-strong hover:border-danger-strong active:border-danger"
        )}
        tabIndex={1}
        onBlur={handleBlur}
        ref={dropdownButtonRef}
      >
        {/* Dropdown Button */}
        <button
          type="button"
          className={classNames(
            "w-full text-left flex items-center justify-between px-4 h-10 border-b-black",
            selectedIndex !== null && !disabled
              ? " text-neutral"
              : "text-neutral-medium",
            disabled &&
              !error &&
              "bg-neutral-weak rounded-md text-neutral-medium",
            disabled && error && "bg-danger-weak rounded-md text-neutral-medium"
          )}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
            }
          }}
        >
          <div className="gap-1 flex w-full items-center">
            {selectedIndex !== null ? (
              <span
                className={classNames(
                  "w-full truncate input",
                  "text-neutral",
                  disabled && "text-neutral-medium"
                )}
              >
                {options[selectedIndex]}
              </span>
            ) : (
              <span
                className={classNames(
                  "w-full truncate input",
                  "text-neutral-medium"
                )}
              >
                {placeholder || "Placeholder"}
              </span>
            )}
          </div>
        </button>

        {/* Options */}
        {isOpen && !disabled && (
          <div
            className={classNames(
              "flex flex-col max-h-[201px] overflow-y-scroll text-neutral absolute rounded-b-md z-10 transform left-[-0.5px]",
              "border-[0.5px] border-t-0 bg-inherit",
              "w-full ml-[0.5px]", //Kanjuh dodao da se rijesi cudna margina povezana s borderom
              disabled && "border-transparent",
              !error &&
                "border-neutral-medium hover:border-neutral-strong active:border-neutral group-hover:border-neutral-strong group-active:border-neutral",
              error &&
                "border-danger-strong hover:border-danger-strong active:border-danger group-hover:border-danger-strong group-active:border-danger"
            )}
          >
            {options.map((option, index) => (
              <button key={option} onClick={() => handleOptionClick(index)}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && !isOpen && (
        <div className="body-3 text-danger">
          {errorMessage ? errorMessage : ""}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
