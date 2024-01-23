import { useState } from "react";
import useDataFetching from "../hooks/student/use-data-fetching";
import { useTableSortingParameters } from "../hooks/student/use-table-sorting-parameters";
import { FilterOptions, TableSortPaginate } from "../atoms/TableSortPaginate";
import { useDropdownData } from "../hooks/student/use-dropdown-data";
import { Table } from "../atoms/DynamicTable";
import { NavigateButton } from "../atoms/NavigateButton";
import { Button } from "../atoms/Button";
import { User } from "../UserContext";
import StudentsPage from "./Students";
import Dropdown from "../atoms/Dropdown";

export const MidtermsPage = () => {
  const [points, setPoints] =
    useState<{ studentId?: string; written?: number; oral?: number }[]>();
  const [acYear, setAcYear] = useState<string | undefined>(undefined);
  const [classGroup, setClassGroup] = useState<string | undefined>(undefined);
  const [labGroup, setLabGroup] = useState<string | undefined>(undefined);

  const { filterData, err: DropdownError } = useDropdownData(acYear);

  const user: User = {
    role: "ADMIN",
    email: "llll",
  };

  const studentFilters: FilterOptions[] = [
    {
      key: "acYear",
      label: "Ak. godina",
      values: filterData.acYears,
      onChange(val) {
        setPageNum(1);
        setAcYear(val);
      },
    },
    {
      key: "classGroup",
      label: "Nast. grupa",
      values: filterData.classGroups,
      onChange(val) {
        setPageNum(1);
        setClassGroup(val);
      },
    },
    {
      key: "midtermType",
      label: "Tip kolokvija",
      values: ["MI", "ZI"],
      onChange(val) {},
    },
  ];
  const {
    direction,
    itemsPerPage,
    orderBy,
    pageNum,
    setDirection,
    setItemsPerPage,
    setOrderBy,
    setPageNum,
  } = useTableSortingParameters();

  const {
    data,
    loading,
    error,
    refetch: dataRefetch,
  } = useDataFetching(pageNum, itemsPerPage, acYear, classGroup, labGroup);

  const titlesObject = {
    firstName: "Ime",
    lastName: "Prezime",
    JMBAG: "JMBAG",
    ClassGroupName: "Nast. grupa",
    input1: "Pismeni dio",
    input2: "Usmeni dio",
  };

  const handleInputChange = (studentId, field, value) => {
    setPoints((prevPoints) =>
      prevPoints.map((student) =>
        student.studentId === studentId
          ? { ...student, [field]: value }
          : student
      )
    );
  };

  return (
    <Table
      objects={data.studentArray ? data.studentArray : []}
      titles={titlesObject}
      inputFields={[
        { key: "input1", placeholder: "Pismeni dio" },
        { key: "input2", placeholder: "Usmeni dio" },
      ]}
      handleInputChange={handleInputChange}
      topActionRow={
        <TableSortPaginate
          numOfPages={data.numOfPages ? data.numOfPages : 1}
          pageNum={pageNum}
          setDirection={setDirection}
          setOrderBy={setOrderBy}
          setPageNum={setPageNum}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          filteringOptions={studentFilters}
          // onSearch={(keywords) => handleSearch(keywords)}
        />
      }
      loading={loading}
      actionRow={(object) =>
        ["ADMIN", "PROFESSOR"].includes(user.role) ? (
          <div className="flex flex-row justify-end ml-1">
            <Button
              label="Uredi"
              //   to={`/dashboard/student/${object.studentId}`}
              buttonType="secondary"
              className="bg-[#2e3964] rounded-md text-neutral-medium h-[24px]"
            />
          </div>
        ) : (
          <></>
        )
      }
    ></Table>
  );
};
