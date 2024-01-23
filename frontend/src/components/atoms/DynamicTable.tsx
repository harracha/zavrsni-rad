import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
// import { RefreshButton } from "./RefreshButton";
import { Spinner } from "./Spinner";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const HTMLTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className=" rounded-xl overflow-y-hidden">
    <table
      ref={ref}
      className={classNames(
        "w-full caption-bottom text-sm overflow-auto",
        className
      )}
      {...props}
    />
  </div>
));
HTMLTable.displayName = "HTMLTable";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={classNames(
      "[&_tr]:border-b [&_tr]:border-b-background",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={classNames("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={classNames(
      "bg-primary font-medium text-primary-foreground",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// const TableRow = React.forwardRef<
//   HTMLTableRowElement,
//   React.HTMLAttributes<HTMLTableRowElement>
// >(({ className, ...props }, ref) => (
//   <tr
//     ref={ref}
//     className={classNames(
//       "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted border-t border-t-background hover:bg-background cursor-pointer bg-section",
//       className
//     )}
//     {...props}
//   />
// ));
// TableRow.displayName = "TableRow";
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { onClick?: () => void }
>(({ className, onClick, ...props }, ref) => {
  // const handleRowClick = (event) => {
  //   const isButtonClick = (event.target as HTMLElement).tagName === "BUTTON";

  //   if (!isButtonClick) {
  //     // If the click is not on a button, call the provided onClick function with the idKey from rowData
  //     onClick && onClick();
  //   }
  // };

  return (
    <tr
      ref={ref}
      className={classNames(
        "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted border-t border-t-background hover:bg-background cursor-pointer bg-section",
        className
      )}
      {...props}
    />
  );
});

TableRow.displayName = "TableRow";

type TableHeadProps = {
  sort?: "asc" | "desc" | undefined; // Define the type for the sort prop
  children: any;
  isActions?: boolean;
  isMiddle?: boolean;
} & React.ThHTMLAttributes<HTMLTableCellElement>;

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sort, children, isActions, isMiddle, ...props }, ref) => (
    <th
      ref={ref}
      className={classNames(
        "h-12 px-4 font-medium text-muted-foreground bg-section-strong",
        className
      )}
      {...props}
    >
      <div
        className={classNames(
          "flex h-full items-center",
          isActions && (isMiddle ? "justify-center" : "justify-end")
        )}
      >
        {children}
        {sort === "asc" && <FaArrowUp />}
        {sort === "desc" && <FaArrowDown />}
      </div>
    </th>
  )
);
TableHead.displayName = "TableHead";

type TableCellProps = {
  isActions?: boolean;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, isActions, ...props }, ref) => (
    <td
      ref={ref}
      className={classNames(
        "p-4 align-middle whitespace-nowrap",
        !isActions && " truncate max-w-[200px]",
        isActions && "w-fit",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

type TableProps<T> = {
  objects: T[];
  titles: { [key in keyof T]?: string };
  onClick?: (object: T) => void;
  actionRow?: (object: T) => React.ReactNode;
  topActionRow?: React.ReactNode;
  bottomActionRow?: React.ReactNode;
  tableAbsoluteElements?: React.ReactNode;
  setSorter?: (val: { [key: string]: string }) => void;
  sortable?: Array<string>;
  loading?: boolean;
  actionsLabelMiddle?: boolean;
  inputFields?: Array<{ key: keyof T; placeholder: string }>;
  handleInputChange?: <K extends keyof T>(
    object: T,
    field: K,
    value: T[K]
  ) => void;
  refreshable?: boolean;
} & (
  | {
      selectable?: true;
      selectBy: keyof T;
      selected: { [key: string]: string };
      setSelected: React.Dispatch<React.SetStateAction<any>>;
      onlyOneSelectable?: boolean;
    }
  | {
      selectable?: false;
      selectBy?: never;
      selected?: never;
      setSelected?: never;
      onlyOneSelectable?: never;
    }
) &
  (
    | {
        refreshable?: true;
        refreshFunction: any;
        isRefreshLoading: boolean;
      }
    | {
        refreshable?: false;
        refreshFunction?: never;
        isRefreshLoading?: never;
      }
  );
export const Table: FC<TableProps<{ [key: string]: any }>> = ({
  objects,
  titles,
  onClick,
  actionRow,
  topActionRow,
  bottomActionRow,
  tableAbsoluteElements,
  setSorter,
  sortable,
  loading,
  actionsLabelMiddle,
  selectable,
  selectBy,
  selected,
  setSelected,
  refreshable,
  refreshFunction,
  isRefreshLoading,
  onlyOneSelectable,
  inputFields,
}) => {
  const titleKeys = Object.keys(titles);

  const [sort, setSort] = useState<{ [key: string]: string }>({});
  const sorter = (prop: string) => {
    if (sortable && sortable.includes(prop)) {
      setSort({ [prop]: sort[prop] === "asc" ? "desc" : "asc" });
    }
  };

  // const handleRowClick = (objectId: string) => {
  //   // Navigate to the individual page based on the objectId
  //   navigate(`${location.pathname}/${objectId}`);
  // };

  useEffect(() => {
    setSorter && setSorter(sort);
  }, [sort]);

  return (
    <div className={"flex flex-col w-full "}>
      <div className="w-full flex gap-2 justify-end items-end mb-2">
        {refreshable && (
          <div
            className={classNames(
              topActionRow && "flex items-end justify-center mb-5  h-full"
            )}
          >
            {/* <RefreshButton
              refreshFunction={refreshFunction}
              refreshLoading={isRefreshLoading}
            /> */}
          </div>
        )}
        {topActionRow}
      </div>
      <div className="border rounded-xl border-neutral-weak">
        <HTMLTable className="rounded-xl relative">
          {tableAbsoluteElements}
          <TableHeader className="pt-3 pb-2 body3 capitalize px-3">
            <TableRow>
              {/* {selectable && !onlyOneSelectable && (
                <TableHead key={"MAIN CHECKBOX"}>
                  <Checkbox
                    checked={
                      objects.filter((object) => selected[object[selectBy]])
                        .length === objects.length
                    }
                    onChange={() => {
                      if (
                        objects.filter((object) => selected[object[selectBy]])
                          .length === objects.length
                      ) {
                        // If all items are selected, unselect all
                        setSelected({});
                      } else {
                        // If not all items are selected, select all
                        const newSelected: { [key: string]: string } = {};
                        objects.forEach((object) => {
                          newSelected[object[selectBy]] = "true";
                        });
                        setSelected(newSelected);
                      }
                    }}
                  />
                </TableHead>
              )} */}
              {selectable && onlyOneSelectable && <div />}
              {titleKeys.map((title, i) => (
                <TableHead
                  key={i}
                  sort={
                    sort[title] == "asc"
                      ? "asc"
                      : sort[title] == "desc"
                      ? "desc"
                      : undefined
                  }
                  onClick={() => {
                    sorter(title);
                  }}
                >
                  {titles[title]}
                </TableHead>
              ))}
              {actionRow && (
                <TableHead isActions isMiddle={actionsLabelMiddle}>
                  Akcije
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          {!loading ? (
            <TableBody>
              {objects.length > 0 &&
                objects.map((object, i) => {
                  return (
                    <TableRow key={i}>
                      {selectable && (
                        <TableCell key={"CHECKBOX " + i}></TableCell>
                      )}

                      {titleKeys.map((title, j) => (
                        <TableCell
                          key={j}
                          onClick={() => {
                            onClick && onClick(object);
                          }}
                        >
                          {inputFields &&
                            inputFields.map(
                              (field) =>
                                field.key === title && (
                                  <input
                                    key={field.key as string}
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={object[field.key]}
                                    onChange={(e) => {
                                      // Update the value in the object when the input changes
                                      object[field.key] = e.target.value;
                                    }}
                                  />
                                )
                            )}
                          {object[title]}
                        </TableCell>
                      ))}
                      {actionRow && (
                        <TableCell className="text-left" isActions>
                          {actionRow(object)}{" "}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <>
              <TableRow>
                {titleKeys.map((title, j) => (
                  <TableCell key={j}>{j === 0 ? <Spinner /> : <></>}</TableCell>
                ))}
                <TableCell>{<></>}</TableCell>
              </TableRow>
            </>
          )}
        </HTMLTable>

        {objects.length === 0 && (
          <p className="py-4 text-neutral-strong text-center">No table data.</p>
        )}
      </div>
      <div className="pt-4">{bottomActionRow}</div>
    </div>
  );
};
