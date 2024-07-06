import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemester: builder.query({
            query: () => {
                return {
                    url: 'academic-semesters',
                    method: 'GET',
                }
            }
        })
    })
})

export const { useGetAllSemesterQuery } = academicSemesterApi