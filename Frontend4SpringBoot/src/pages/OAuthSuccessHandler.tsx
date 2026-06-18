import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "@/services/store";
import { refreshToken } from "@/services/AuthService";

const OAuthSuccessHandler = () => {
  const navigate = useNavigate();

  const changeData = useAuth(
    (state) => state.changeLocalLoginData
  );

  useEffect(() => {
    const completeLogin = async () => {
      try {
        const response = await refreshToken();

        changeData(
          response.token,
          response.user,
          true
        );

        toast.success("OAuth Login Successful");

        navigate("/dashboard", {
          replace: true,
        });
      } catch (error) {
        console.error(error);

        toast.error("OAuth Login Failed");

        navigate("/login", {
          replace: true,
        });
      }
    };

    completeLogin();
  }, [changeData, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mx-auto" />

        <h2 className="text-xl font-semibold">
          Completing Login...
        </h2>

        <p className="text-muted-foreground">
          Please wait while we authenticate you.
        </p>
      </div>
    </div>
  );
};

export default OAuthSuccessHandler;