import React, { useState } from "react";
import { Code, Mail, AlertCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

import type RegisterData from "@/Models/Register";
import { registerUser } from "@/services/AuthService";

import { toast } from "react-hot-toast";
import OAuth2Buttons from "@/components/OAuth2Buttons";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<RegisterData>({
    name: "",
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

    if (!data.name.trim()) {
      setError("Name field is required");
      return;
    }

    if (!data.email.trim()) {
      setError("Email field is required");
      return;
    }

    if (!data.password.trim()) {
      setError("Password field is required");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser(data);

      console.log(res);

      toast.success("Account created successfully");

      setData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Error registering user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <Card className="w-full max-w-lg mt-4 mb-5 border border-white/10 bg-card/70 shadow-2xl backdrop-blur-2xl">
        <CardHeader className="space-y-3 pb-5 text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Create Account
          </CardTitle>

          <CardDescription className="text-base text-muted-foreground">
            Sign up with email or OAuth provider
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert
              variant="destructive"
              className="mb-4"
            >
              <AlertCircleIcon className="h-4 w-4" />

              <AlertTitle>
                Registration Failed
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
                Full Name
              </Label>

              <Input
                placeholder="Enter your name"
                className="h-9 rounded-xl px-3 text-base"
                value={data.name}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold tracking-wide">
                Email Address
              </Label>

              <Input
                type="email"
                placeholder="Enter your email"
                className="h-9 rounded-xl px-3 text-base"
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
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
                placeholder="Create a password"
                className="h-9 rounded-xl px-3 text-base"
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-xl text-base font-semibold"
            >
              {loading ? (
                <>
                  <Spinner className="mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <OAuth2Buttons/>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-violet-400 transition-colors hover:text-violet-300"
              >
                Login
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;