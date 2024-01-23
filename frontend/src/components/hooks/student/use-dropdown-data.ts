import { useEffect, useState } from "react";
import { studentFilterData } from "../../../types/student-dropdown-filters";

export const useDropdownData =  (acYear: string) => {
    
    const [filterData, setFilterData] = useState<studentFilterData>({});
    const [err, setError] = useState(null);

    const fetchDropdownData = async () => {
        
        try {
             await fetch(`${process.env.REACT_APP_BE_URL}/enrollment/getDropdownContent/2023-2024`).then(async(response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                  }
                  const result: Omit<studentFilterData, 'acYears'> = await response.json();
                  setFilterData((prevData) => ({
                    ...prevData, classGroups: result.classGroups, labGroups: result.labGroups
                  }));
            });
             await fetch(`${process.env.REACT_APP_BE_URL}/enrollment/getAcYears`).then(async(response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                  }
                  const result: Omit<studentFilterData, 'classGroups' & 'labGroups'> = await response.json();
                  setFilterData((prevData) => ({
                    ...prevData, acYears: result.acYears
                  }));
            });

            // return await Promise.all([filters,years])
            
        } catch (err) {
            setError(err.message);
        } finally {
        }
    }

    useEffect(()=> {
        fetchDropdownData();
    }, [acYear])

    return {filterData, err}
}