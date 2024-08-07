import { FieldValues, SubmitHandler } from "react-hook-form"
import PhForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions, nameOptions, yearOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const CreateAcademicSemester = () => {

  const [addAcademicSemester] = useAddAcademicSemesterMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...')

    const name = nameOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year
    }

    try {
      console.log(semesterData);
      const res = (await addAcademicSemester(semesterData)) as TResponse

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId })
      } else {
        toast.success('Semester Created', { id: toastId })
      }

    } catch (error) {
      toast.error('Something went wrong', { id: toastId })
      console.log(error);
    }
  }

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
          <PHSelect label="Name" name='name' options={nameOptions} />
          <PHSelect label="Year" name='year' options={yearOptions} />
          <PHSelect label="Start Month" name='startMonth' options={monthOptions} />
          <PHSelect label="End Month" name='endMonth' options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  )
}

export default CreateAcademicSemester