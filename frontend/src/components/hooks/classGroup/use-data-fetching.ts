import { useEffect, useState } from "react"

type classGroupReturn = {
    numOfPages?: number;
    classGroups?: Array<any>;
}

export const useDataFetching = (pageNum, itemsPerPage, acYear) => {
    const [data, setData] = useState<classGroupReturn>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/classGroup/list?pageNr=${pageNum}&itemsPerPg=${itemsPerPage}&acYear=${acYear}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const result: classGroupReturn = await response.json();
              console.log(result);
              setData((prevData) => ({
                ...prevData, numOfPages: result.numOfPages, classGroups: result.classGroups
              }));
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    const refetch = () => {
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [pageNum, itemsPerPage, acYear])

    return {data, loading, error, refetch}

}