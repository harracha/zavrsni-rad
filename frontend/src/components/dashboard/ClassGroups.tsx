import { useState } from "react";
import { useTableSortingParameters } from "../hooks/student/use-table-sorting-parameters";
import { useDropdownData } from "../hooks/classGroup/use-dropdown-data";
import { FilterOptions, TableSortPaginate } from "../atoms/TableSortPaginate";
import { useDataFetching } from "../hooks/classGroup/use-data-fetching";
import { Table } from "../atoms/DynamicTable";
import { useNavigate } from "react-router-dom";
import { NavigateButton } from "../atoms/NavigateButton";
import { User } from "../UserContext";
import { Button } from "../atoms/Button";

const ClassGroupsPage = () => {
  const navigate = useNavigate();
  const [acYear, setAcYear] = useState<string | undefined>(undefined);

  const user: User = {
    email: "oo",
    role: "ADMIN",
  };

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
    data: acYears,
    error: dropdownError,
    refetch: acYearRefetch,
  } = useDropdownData();

  const {
    data: classGroups,
    loading,
    error,
    refetch: dataRefetch,
  } = useDataFetching(pageNum, itemsPerPage, acYear);

  const classGroupFilters: FilterOptions[] = [
    {
      key: "acYear",
      label: "Ak. godina",
      values: acYears,
      onChange(val) {
        setPageNum(1);
        setAcYear(val);
      },
    },
  ];

  const titlesObject = {
    groupName: "Naziv",
    professors: "Profesori",
    assistants: "Assistenti",
    studentCount: "Broj studenata",
  };

  return (
    <Table
      objects={classGroups.classGroups ? classGroups.classGroups : []}
      titles={titlesObject}
      topActionRow={
        <TableSortPaginate
          numOfPages={classGroups.numOfPages ? classGroups.numOfPages : 1}
          pageNum={pageNum}
          setDirection={setDirection}
          setOrderBy={setOrderBy}
          setPageNum={setPageNum}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          filteringOptions={classGroupFilters}
          // onSearch={(keywords) => handleSearch(keywords)}
        />
      }
      onClick={(object) =>
        navigate(`/dashboard/nastavne-grupe/${object.groupId}`)
      }
      loading={loading}
      actionRow={(object) =>
        ["ADMIN", "PROFESSOR"].includes(user.role) ? (
          <div className="flex flex-row justify-end ml-1">
            <NavigateButton
              label="Uredi"
              to={`/dashboard/classGroup/${object.groupId}`}
              buttonType="secondary"
              className="bg-[#2e3964] rounded-md text-neutral-medium h-[24px]"
            />
            {/* <Button
              buttonType="secondary"
              label="Izbriši"
              onClick={async () => {
                // await deleteStudent(object.studentId);
                dataRefetch();
              }}
              loading={deleting}
              className="bg-[#f45050] rounded-md text-neutral-medium h-[24px]"
            /> */}
          </div>
        ) : (
          <></>
        )
      }
    ></Table>
  );
};

export default ClassGroupsPage;
