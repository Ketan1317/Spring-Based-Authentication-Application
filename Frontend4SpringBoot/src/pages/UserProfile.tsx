import {
  User as UserIcon,
  Mail,
  Shield,
  Calendar,
  Clock,
  BadgeCheck,
  Pencil,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useAuth from "@/services/store";

const UserProfile = () => {
  const user = useAuth((state) => state.user);
  console.log(user)

  if (!user) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      {/* Background Glow */}
      <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-5xl font-extrabold tracking-tight">
          Profile Dashboard
        </h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="border-white/10 bg-card/60 backdrop-blur-xl lg:col-span-1">
            <CardContent className="flex flex-col items-center gap-4 pt-8">
              <Avatar className="h-32 w-32 border-4 border-violet-500/30">
                <AvatarImage src={user.image} />
                <AvatarFallback className="text-3xl">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>

              <Badge
                variant={
                  user.enable
                    ? "default"
                    : "destructive"
                }
              >
                {user.enable
                  ? "Active Account"
                  : "Disabled"}
              </Badge>

              <Button className="mt-2 w-full">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* User Details */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>
                  Account Information
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-5 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-violet-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Name
                    </p>
                    <p className="font-medium">
                      {user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>
                    <p className="font-medium">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Provider
                    </p>
                    <Badge>
                      {user.provider}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      User ID
                    </p>
                    <p className="font-medium break-all">
                      {user.id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>
                  Activity Information
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-5 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-violet-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Created At
                    </p>

                    <p className="font-medium">
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Updated At
                    </p>

                    <p className="font-medium">
                      {user.updatedAt
                        ? new Date(
                            user.updatedAt
                          ).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 backdrop-blur-xl">
              <CardContent className="py-6">
                <h3 className="mb-2 text-xl font-bold">
                  Account Status
                </h3>

                <p className="text-muted-foreground">
                  Your account is currently{" "}
                  <span className="font-semibold text-green-400">
                    {user.enable
                      ? "Active"
                      : "Disabled"}
                  </span>
                  . Authentication provider:
                  <span className="ml-1 font-semibold">
                    {user.provider}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;