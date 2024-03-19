import { useSelector } from "react-redux";
import type { RootState } from "./../../redux/store";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, token } = useSelector((state: RootState) => state.auth);
  console.log("Protected Route==>", { user, token });
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [user, token]);

  return <>{children}</>;
}
