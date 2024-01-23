import { useEffect, useState } from "react";

export const useDataFiltering = async (classGroup, labGroup, name, acYear) => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://0076657e-9be2-4335-983b-131c1629f6fb.mock.pstmn.io/studenti?someFilter");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const result = await response.json();
              setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    } 

    useEffect(() => {
        fetchData();
      }, [classGroup, labGroup, name, acYear]);

    // mozda nepotrebno
    const refetch = () => {
        fetchData();
    }
    
    return {data, loading, error}
    
}