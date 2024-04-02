import { useSelector } from "react-redux";
import type { RootState } from "./../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  // const [loading, setLoading] = useState(true);
  const { user, token } = useSelector((state: RootState) => state.auth);
  console.log("Protected Route==>", { user, token });
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [user, token]);

  // if (!token) {
  //   Navigate({ to: "/login" });
  // }
  return <>{!token ? <p>Loading....</p> : children}</>;
}
