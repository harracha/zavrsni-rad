import { useState } from "react"

export const useStudentDelete = () => {

    const [deleting, setDeleting] = useState<boolean>(false);
    const [error, setError] = useState(undefined)
    const [student, setStudent] = useState(undefined)

    const deleteStudent = async (JMBAG: string) => {
        
        try {
            setDeleting(true)
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/student/delete/${JMBAG}`, {method: 'DELETE'});
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            console.log(result)
            setStudent(result);
          } catch (err) {
            setError(err.message);
          } finally {
            setDeleting(false);
          }
    }

    return {student, deleteStudent, deleting, error}

}