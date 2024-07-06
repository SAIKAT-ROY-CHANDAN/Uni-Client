import { useGetAllSemesterQuery } from "../../../redux/features/academicManagement/academicSemesterApi"

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined)

  console.log(data);

  return (
    <h1>AcademicSemester</h1>
  )
}

export default AcademicSemester