import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/services/store";

const Navbar = () => {
  const logout = useAuth((state) => state.logout);
  const authStatus = useAuth((state) => state.authStatus);
  const user = useAuth((state) => state.user);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <h1 className="cursor-pointer text-2xl font-bold tracking-tight">
            Auth App
          </h1>
        </Link>

        {authStatus ? (
          <div className="flex items-center gap-4">
            <h2 className="font-medium">
              Welcome, {user?.name}
            </h2>

            <Button
            className="cursor-pointer font-bold"
              variant="destructive"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;