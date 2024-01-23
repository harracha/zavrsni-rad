// import DynamicTable from "../table/DynamicTable";

import { useEffect, useMemo, useState } from "react";
import { Table } from "../atoms/DynamicTable";
import { FilterOptions, TableSortPaginate } from "../atoms/TableSortPaginate";
import useDataFetching from "../hooks/student/use-data-fetching";
import { useTableSortingParameters } from "../hooks/student/use-table-sorting-parameters";
import { useDropdownData } from "../hooks/student/use-dropdown-data";
import { User } from "../UserContext";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { NavigateButton } from "../atoms/NavigateButton";
import { useStudentDelete } from "../hooks/student/use-student-delete";

const StudentsPage = () => {
  const [acYear, setAcYear] = useState<string | undefined>(undefined);
  const [classGroup, setClassGroup] = useState<string | undefined>(undefined);
  const [labGroup, setLabGroup] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();
  const { filterData, err: DropdownError } = useDropdownData(acYear);

  // const { user } = useUser();

  const user: User = {
    role: "ADMIN",
    email: "llll",
  };
  const {
    student,
    deleteStudent,
    deleting,
    error: deleteError,
  } = useStudentDelete();

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
      key: "labGroup",
      label: "Lab. grupa",
      values: filterData.labGroups,
      onChange(val) {
        setPageNum(1);
        setLabGroup(val);
      },
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
    LabGroupName: "Lab. grupa",
  };

  return (
    <Table
      objects={data.studentArray ? data.studentArray : []}
      titles={titlesObject}
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
      onClick={(object) => navigate(`/dashboard/studenti/${object.studentId}`)}
      loading={loading}
      actionRow={(object) =>
        ["ADMIN", "PROFESSOR"].includes(user.role) ? (
          <div className="flex flex-row justify-end ml-1">
            <NavigateButton
              label="Uredi"
              to={`/dashboard/student/${object.studentId}`}
              buttonType="secondary"
              className="bg-[#2e3964] rounded-md text-neutral-medium h-[24px]"
            />
            <Button
              buttonType="secondary"
              label="Izbriši"
              onClick={async () => {
                await deleteStudent(object.studentId);
                dataRefetch();
              }}
              loading={deleting}
              className="bg-[#f45050] rounded-md text-neutral-medium h-[24px]"
            />
          </div>
        ) : (
          <></>
        )
      }
    ></Table>
  );
};

export default StudentsPage;
