import React, { useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { useDebounce } from "usehooks-ts";

interface Props<Type> {
  topic: string;
  selectedOption?: Type;
  options?: Type[];
  selectHandler: (selected: Type, selectedIdx: number) => void;
}

function DropDownWithSearch<
  T extends { id: string; value: string; icon?: string | JSX.Element },
>({ topic, selectedOption, options, selectHandler }: Props<T>) {
  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce<string>(input, 700);

  const filteredValue = useMemo(() => {
    return options
      ? options.filter((option) => {
          if (!debouncedInput) {
            return true;
          } else {
            return option.value
              .toLowerCase()
              .includes(debouncedInput.toLowerCase());
          }
        })
      : [];
  }, [debouncedInput]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="relative bg-white w-full h-56 overflow-hidden flex flex-col space-y-2 px-1 md:px-3">
      {selectedOption?.value && (
        <span className="w-full flex justify-between py-1">
          <p>{selectedOption.value}</p>
          <BsCheckCircle className="text-primary-6 w-5 h-5" />
        </span>
      )}

      <span className="flex space-x-2 items-center bg-shade-light/50 rounded-md w-full md:py-1 px-1 md:px-3">
        <AiOutlineSearch className="w-5 h-5 text-shade-medium" />
        <input
          onChange={handleInput}
          className={`input-outline-none block border-none bg-shade-light/20 py-1 px-1 text-shade-dark text-base h-full w-full`}
          type="text"
          placeholder={`Search for ${topic}`}
          id={topic}
        />
      </span>

      {options && (
        <span className="flex flex-col flex-1 h-44 overflow-y-auto generic-scrollbar space-y-1">
          {filteredValue.map((option, i) => (
            <div key={i} className="flex flex-row space-x-2 items-center">
              {typeof option.icon === "string" ? (
                <ReactCountryFlag
                  countryCode={option.icon as string}
                  svg
                  style={{
                    width: "1rem",
                    height: "1rem",
                  }}
                  title={option.icon as string}
                />
              ) : (
                <>{option?.icon}</>
              )}
              <p
                onClick={() => selectHandler(option, i)}
                className="hover:cursor-pointer hover:text-primary-6 nav-link font-semibold"
              >
                {option.value}
              </p>
            </div>
          ))}
        </span>
      )}
    </div>
  );
}

export default DropDownWithSearch;
