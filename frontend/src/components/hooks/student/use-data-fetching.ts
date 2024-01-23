import { useState, useEffect } from 'react';

type studentDataReturn = {
  numOfPages?: number;
  studentArray?: Array<any>
}
const useDataFetching = (pageNum, itemsPerPage, acYear, classGroup, labGroup) => {
  const [data, setData] = useState<studentDataReturn>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/student/list?pageNr=${pageNum}&itemsPerPg=${itemsPerPage}&acYear=${acYear}&classGroupName=${classGroup}&labGroupName=${labGroup}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: studentDataReturn = await response.json();
      setData((prevData) => ({
        ...prevData, numOfPages: result.numOfPages, studentArray: result.studentArray
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNum, itemsPerPage, classGroup, labGroup]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useDataFetching;
