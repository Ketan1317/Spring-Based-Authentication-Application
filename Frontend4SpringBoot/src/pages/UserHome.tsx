import {
  User as UserIcon,
  ShieldCheck,
  Mail,
  Calendar,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import useAuth from "@/services/store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type User from "@/Models/User";
import { getCurrentUser } from "@/services/AuthService";
import { toast } from "react-hot-toast";

const UserHome = () => {
  const user = useAuth((state) => state.user);

  const [currUser,setCurrUser] = useState<User | null>(null);

  const handleBtn = async() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const res = await getCurrentUser(user?.email!);
      setCurrUser(res)
    } catch (error) {
      toast.error("Error in Fetching User " + error)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      {/* Background Glow */}
      <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        {/* Hero Section */}
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
          <CardContent className="flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Welcome back,
                <span className="ml-2 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {user?.name}
                </span>
              </h1>

              <p className="mt-2 text-muted-foreground">
                Manage your account, profile, and authentication settings.
              </p>
            </div>

            <Link to="/dashboard/profile">
              <Button size="lg">
                View Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <UserIcon className="h-10 w-10 text-violet-400" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Username
                </p>
                <h3 className="font-bold">
                  {user?.name}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Mail className="h-10 w-10 text-cyan-400" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>
                <h3 className="font-bold truncate">
                  {user?.email}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <ShieldCheck className="h-10 w-10 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Provider
                </p>
                <h3 className="font-bold">
                  {user?.provider}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Calendar className="h-10 w-10 text-orange-400" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Status
                </p>
                <Badge
                  variant={
                    user?.enable
                      ? "default"
                      : "destructive"
                  }
                >
                  {user?.enable
                    ? "Active"
                    : "Disabled"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-white/10 bg-card/60 backdrop-blur-xl transition-all hover:scale-[1.02]">
            <CardHeader>
              <CardTitle>
                Profile Management
              </CardTitle>

              <CardDescription>
                View and update your profile details.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Link to="/dashboard/profile">
                <Button className="w-full">
                  Open Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/60 backdrop-blur-xl transition-all hover:scale-[1.02]">
            <CardHeader>
              <CardTitle>
                Security Center
              </CardTitle>

              <CardDescription>
                Manage authentication and account security.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                className="w-full"
                variant="secondary"
              >
                Security Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/60 backdrop-blur-xl transition-all hover:scale-[1.02]">
            <CardHeader>
              <CardTitle>
                Account Activity
              </CardTitle>

              <CardDescription>
                Track recent updates and account changes.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                className="w-full"
                variant="outline"
              >
                View Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Information Panel */}
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>
              Account Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p>
              <span className="font-semibold">
                User ID:
              </span>{" "}
              {user?.id}
            </p>

            <p>
              <span className="font-semibold">
                Created:
              </span>{" "}
              {user?.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleString()
                : "N/A"}
            </p>

            <p>
              <span className="font-semibold">
                Updated:
              </span>{" "}
              {user?.updatedAt
                ? new Date(
                    user.updatedAt
                  ).toLocaleString()
                : "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>
  <div className="mt-8 flex flex-col items-center">
  <Button onClick={handleBtn}>
    Get Current User
  </Button>

  {currUser && (
    <Card className="mt-4 w-full max-w-md border-white/10 bg-card/60 backdrop-blur-xl">
      <CardContent className="pt-6 text-center">
        <h2 className="text-xl font-bold">
          {currUser.name}
        </h2>

        <p className="mt-2 text-muted-foreground">
          {currUser.email}
        </p>

        <p className="mt-2">
          <span className="font-semibold">
            Provider:
          </span>{" "}
          {currUser.provider}
        </p>
      </CardContent>
    </Card>
  )}
</div>
    </div>
  );
};

export default UserHome;