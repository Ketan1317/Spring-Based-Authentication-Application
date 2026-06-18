import { Button } from "./ui/button";
import { Code, Mail } from "lucide-react";

const BACKEND_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:8080";

const OAuth2Buttons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <a
        href={`${BACKEND_URL}/oauth2/authorization/github`}
        className="w-full"
      >
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full rounded-xl text-sm font-medium"
        >
          <Code className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </a>

      <a
        href={`${BACKEND_URL}/oauth2/authorization/google`}
        className="w-full"
      >
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full rounded-xl text-sm font-medium"
        >
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
      </a>
    </div>
  );
};

export default OAuth2Buttons;