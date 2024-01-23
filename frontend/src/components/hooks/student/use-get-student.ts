import { useEffect, useState } from "react";

type studentDataReturn = {
    numOfPages?: number;
    studentArray?: Array<any>
}

export const useGetStudent = (keyword: string) => {
    const [data, setData] = useState<studentDataReturn | undefined>({numOfPages: 1});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [keywordSearch, setKeywordSearch] = useState<boolean>(false)

    const fetchStudent = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/student/${keyword}`)
            if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const result: studentDataReturn = await response.json();
              setData((prevData) => ({
                ...prevData,  studentArray: Array.from(result.studentArray)
              }));
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
        }

        useEffect(() => {
            if(keyword !== ''){
                fetchStudent()
            }
            else{
                setData(undefined)
            }
        }, [keyword])

        // const changeSearchState = () => {
        //     setKeywordSearch((prevValue) => {return (!prevValue)})
        // }
        return {data, loading, error}
    }

