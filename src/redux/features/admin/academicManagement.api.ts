import { TResponseRedux } from './../../../types';
import { baseApi } from "../../api/baseApi";
import { TAcademicSemester } from '../../../types/academicManagementType';

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                params.append('name', args)

                return {
                    url: '/academic-semesters',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse(response: TResponseRedux<TAcademicSemester>) {
                return {
                    data: response.data,
                    meta: response.meta
                }
            },
        }),
        addAcademicSemester: builder.mutation({
            query: (data) =>
            ({
                url: '/academic-semesters/create-academic-semester',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useGetAllSemesterQuery, useAddAcademicSemesterMutation } = academicManagementApi