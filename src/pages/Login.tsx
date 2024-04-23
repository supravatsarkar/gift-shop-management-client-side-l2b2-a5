/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useForm, SubmitHandler, FieldValue } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { decodeJwtToken } from "../utils";
import { NavLink, useNavigate } from "react-router-dom";

export type TLoginCreds = {
  email: string;
  password: string;
};
export default function Login() {
  const defaultValue = {
    email: "supravat.sarkar@yopmail.com",
    password: "Qwerty@123",
  };
  // const { register, handleSubmit, formState } = useForm<TLoginCreds>({
  //   defaultValues: {
  //     ...defaultValue,
  //   },
  // });
  const [login, { data, isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ data, error });
  const submitHandler: SubmitHandler<TLoginCreds> = async (data) => {
    console.log("data", data);
    const toastId = toast.promise(new Promise((resolve, reject) => {}), {
      loading: "Loading...",
    });

    console.log({ toastId });
    try {
      const loginRes = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      // let loginRes = await fetch("http://localhost:5000/api/v1/auth/login", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify({ email: data.email, password: data.password }),
      // });
      // loginRes = await loginRes.json();
      console.log("Login res", loginRes);
      const token = loginRes?.data?.accessToken;
      const decodedData = decodeJwtToken(token);
      dispatch(setUser({ user: decodedData, token: token }));
      toast.success("Login Success!", { id: toastId });
      if (decodedData.role !== "customer") {
        navigate(`/${decodedData.role}`);
      } else {
        navigate(`/customer`);
      }
    } catch (error: any) {
      console.log("login error=>", error);
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        // className="m-20 p-30 text-center rounded-xl"
        style={{
          // border: "2px solid gray",
          margin: "20px",
          padding: "30px",
          textAlign: "center",
          borderRadius: "5px",
          boxShadow: "0px 0px 8px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          gap: "30px",
          // maxWidth: "1%",
        }}
      >
        <h2>Gift Shop Management System </h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={submitHandler}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<TLoginCreds>
            label="Email"
            name="email"
            initialValue={defaultValue.email}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<TLoginCreds>
            label="Password"
            name="password"
            initialValue={defaultValue.password}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <NavLink to="/register">
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
