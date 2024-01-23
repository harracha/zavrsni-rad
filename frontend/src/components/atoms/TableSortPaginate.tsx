import { FC, ReactNode, useState } from "react";
import {
  possibleItemsPerPage,
  sortDirection,
  sortOptions,
} from "../hooks/student/use-table-sorting-parameters";
import Dropdown from "./Dropdown";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
export type FilterOptions = {
  key: string;
  label: string;
  onChange?: (val: any) => void;
  values: string[];
};
interface ITableSortPaginate {
  setOrderBy: (val: sortOptions) => void;
  setDirection: (val: sortDirection) => void;
  setPageNum: (val: number) => void;
  pageNum: number;
  numOfPages: number | undefined;
  setItemsPerPage?: (val: possibleItemsPerPage) => void;
  itemsPerPage?: string;
  additionalChildren?: ReactNode;
  filteringOptions?: FilterOptions[];
  onSearch?: (keywords: string) => void; // Callback for search functionality
}
export const TableSortPaginate: FC<ITableSortPaginate> = ({
  pageNum,
  setDirection,
  setOrderBy,
  setPageNum,
  numOfPages,
  itemsPerPage,
  setItemsPerPage,
  additionalChildren,
  filteringOptions,
  onSearch,
}) => {
  const [searchKeywords, setSearchKeywords] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchKeywords);
    }
  };
  return (
    <div className="w-full flex border-t-[1px] p-2 border-neutral mt-3  gap-1 items-end justify-between">
      {setDirection && setOrderBy && (
        <div className="w-[400px] gap-1 flex items-center">
          {filteringOptions.map((option) => (
            <Dropdown
              key={option.key}
              label={option.label}
              options={option.values}
              placeholder="------"
              onChange={(val: any) => option.onChange && option.onChange(val)}
            ></Dropdown>
          ))}
          {/* <Dropdown 
            options={["make", "price", "createdAt"]}
            defaultValue="createdAt"
            label="Sort by"
            onChange={(val) => {
              setOrderBy(val as sortOptions);
            }}
          />
          <Dropdown
            options={["asc", "desc"]}
            defaultValue="desc"
            label="Sort direction"
            onChange={(val) => {
              setDirection(val as sortDirection);
            }}
          /> */}
        </div>
      )}

      <div className="flex gap-1 items-end">
        <div className="mr-2">{additionalChildren}</div>
        {/* <div className="flex items-center mr-2">
          <input
            type="text"
            placeholder="Search..."
            // value={searchKeywords}
            // onChange={(e) => {}}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="ml-2 px-3 py-1 bg-neutral hover:bg-neutral-strong rounded cursor-pointer"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div> */}
        {setItemsPerPage && (
          <Dropdown
            defaultValue={itemsPerPage}
            options={["10", "20", "50"]}
            label="Items per page"
            onChange={(val) => setItemsPerPage(val as possibleItemsPerPage)}
          />
        )}
        <div className="flex items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              pageNum > 1 && setPageNum(pageNum - 1);
            }}
          >
            <FaArrowLeft />
            {/* <Icon
              size={40}
              className="hover:bg-primary bg-neutral"
              icon="chevron-left"
            /> */}
          </div>
          <p className="">
            {numOfPages ? `${pageNum}/${numOfPages}` : pageNum}
          </p>
          <div
            className="cursor-pointer"
            onClick={() => {
              numOfPages && pageNum < numOfPages && setPageNum(pageNum + 1);
            }}
          >
            <FaArrowRight />
            {/* <Icon
              size={40}
              className="hover:bg-primary bg-neutral"
              icon="chevron-right"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
