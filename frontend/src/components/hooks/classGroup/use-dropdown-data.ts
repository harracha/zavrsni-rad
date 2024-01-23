import { useEffect, useState } from "react"

export const useDropdownData = () => {
    const [data, setData] = useState<Array<string>>([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
           
            await fetch(`${process.env.REACT_APP_BE_URL}/enrollment/getAcYears`).then(async(response) => {
               if (!response.ok) {
                   throw new Error('Failed to fetch data');
                 }
                 const result: {acYears: string[]} = await response.json();
                 setData(result.acYears);
           });

          
       } catch (err) {
           setError(err.message);
       
    }

    }

    useEffect(() => {
        fetchData()
    },[])

    const refetch = () => {
        fetchData();
    }

    return {data, error, refetch}
}