/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useForm, SubmitHandler, FieldValue } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { decodeJwtToken } from "../utils";
import { useNavigate } from "react-router-dom";

export type TLoginCreds = {
  email: string;
  password: string;
};
export default function Login() {
  const { register, handleSubmit, formState } = useForm<TLoginCreds>({
    defaultValues: {
      email: "supravat.sarkar@yopmail.com",
      password: "Qwerty@123",
    },
  });
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
        border: "2px solid gray",
        margin: "20px",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h2>Login </h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          marginTop: "20px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          {...register("email", { required: true })}
          placeholder="email"
        />
        {formState.errors.email && (
          <p style={{ color: "red" }}>Email is required</p>
        )}
        <input
          type="text"
          {...register("password", { required: true })}
          placeholder="password"
        />
        {formState.errors.password && (
          <p style={{ color: "red" }}>Password is required</p>
        )}

        <Button htmlType="submit">Login</Button>
      </form>
    </div>
  );
}
