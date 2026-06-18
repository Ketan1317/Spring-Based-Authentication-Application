import React, { useState } from "react";
import { Code, Mail, AlertCircleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { Spinner } from "@/components/ui/spinner";

import type LoginData from "@/Models/Login";
import { loginUser } from "@/services/AuthService";

import { toast } from "react-hot-toast";
import useAuth from "@/services/store";
import OAuth2Buttons from "@/components/OAuth2Buttons";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuth((state => state.login))

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!loginData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!loginData.password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      // const res = await loginUser(loginData);

      // console.log(res);
      await login(loginData)
      

      toast.success("Login successful");

      navigate("/");
    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <Card className="w-full max-w-lg border border-white/10 bg-card/70 shadow-2xl backdrop-blur-2xl">
        <CardHeader className="space-y-3 pb-8 text-center">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-base text-muted-foreground">
            Login to continue your journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert
              variant="destructive"
              className="mb-5"
            >
              <AlertCircleIcon className="h-4 w-4" />

              <AlertTitle>
                Login Failed
              </AlertTitle>

              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={handleFormSubmit}
            className="space-y-6"
          >
            <div className="space-y-3">
              <Label className="text-sm font-semibold tracking-wide">
                Email Address
              </Label>

              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl px-4 text-base"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold tracking-wide">
                Password
              </Label>

              <Input
                type="password"
                placeholder="Enter your password"
                className="h-12 rounded-xl px-4 text-base"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl text-base font-semibold"
            >
              {loading ? (
                <>
                  <Spinner className="mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <OAuth2Buttons/>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-violet-400 transition-colors hover:text-violet-300"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;