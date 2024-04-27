/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, FormProps } from "antd";
import { useForm, SubmitHandler, FieldValue } from "react-hook-form";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { decodeJwtToken } from "../utils";
import { NavLink, useNavigate } from "react-router-dom";
import { roles } from "../config/constants";

export type TRegisterData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
};
export default function Register() {
  const defaultValue = {
    email: "supravat.sarkar@yopmail.com",
    password: "Qwerty@123",
    name: "Supravat Sarkar",
    phone: "9851650495",
  };

  const [register, { data, isLoading, isError, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ data, error });
  const submitHandler: FormProps<TRegisterData>["onFinish"] = async (data) => {
    console.log("data", data);
    const toastId = toast.promise(new Promise(() => {}), {
      loading: "Loading...",
    });

    console.log({ toastId });
    try {
      const registerRes = await register({
        role: roles.manager,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }).unwrap();
      console.log("registerRes res", registerRes);
      const token = registerRes?.data?.accessToken;
      const decodedData = decodeJwtToken(token);
      dispatch(setUser({ user: decodedData, token: token }));
      toast.success("Register Success!", { id: toastId });
      if (decodedData.role !== "customer") {
        navigate(`/admin`);
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
          <Form.Item<TRegisterData>
            label="Name"
            name="name"
            initialValue={defaultValue.name}
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<TRegisterData>
            label="Email"
            name="email"
            initialValue={defaultValue.email}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<TRegisterData>
            label="Phone"
            name="phone"
            initialValue={defaultValue.phone}
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<TRegisterData>
            label="Password"
            name="password"
            initialValue={defaultValue.password}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<TRegisterData>
            label="Password"
            name="password2"
            initialValue={defaultValue.password}
            rules={[
              { required: true, message: "Please reenter your password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <NavLink to="/login">
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
