import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation();
  const defaultValues = {
    userId: 'A-0001',
    password: 'adminPassword123'
  }


  const onsubmit = async (data: FieldValues) => {
    const toastId = toast.loading('logging in')

    try {
      const userInfo = {
        id: data.userId,
        password: data.password
      }
      const res = await login(userInfo).unwrap()
      const user = verifyToken(res.data.accessToken) as TUser

      dispatch(setUser({ user: user, token: res.data.accessToken }))

      toast.success('Logged in successfully', { id: toastId })
      navigate(`/${user.role}/dashboard`)
    } catch (error) {
      toast.error('Something went wrong', { id: toastId })
    }


  }

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <PHForm onSubmit={onsubmit} defaultValues={defaultValues}>
        <PHInput type='text' name='userId' label='Id' />
        <PHInput type="text" name="password" label='Password' />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
