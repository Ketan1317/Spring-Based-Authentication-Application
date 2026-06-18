import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Services from "./pages/Services"
import About from "./pages/About"
import RootLayout from "./pages/RootLayout"
import { ArrowRight, Shield, Lock, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import UserLayout from "./pages/UserLayout"
import UserHome from "./pages/UserHome"
import UserProfile from "./pages/UserProfile"
import OAuthSuccessHandler from "./pages/OAuthSuccessHandler";
import OAuthFailureHandler from "./pages/OAuthFailureHandler";

const Home = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 h-72 w-72 animate-pulse rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-20 bottom-20 h-72 w-72 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
            OAuth2 • JWT • Spring Security 6
          </div>

          <h1 className="bg-gradient-to-r from-violet-400 via-cyan-400 to-purple-500 bg-clip-text text-6xl font-extrabold text-transparent">
            Secure Authentication
            <br />
            For Modern Applications
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Enterprise-grade authentication powered by Spring Boot, OAuth2, JWT
            Tokens, Role Based Access Control, and Secure Session Management.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="group rounded-xl px-8">
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl px-8"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="group rounded-2xl border bg-card/50 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <Shield className="mb-4 h-12 w-12 text-violet-400 transition-transform group-hover:scale-110" />

            <h3 className="mb-2 text-xl font-bold">Spring Security 6</h3>

            <p className="text-muted-foreground">
              Advanced security configuration with stateless authentication and
              authorization.
            </p>
          </div>

          <div className="group rounded-2xl border bg-card/50 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <Lock className="mb-4 h-12 w-12 text-cyan-400 transition-transform group-hover:scale-110" />

            <h3 className="mb-2 text-xl font-bold">JWT Authentication</h3>

            <p className="text-muted-foreground">
              Secure access and refresh token strategy with scalable
              architecture.
            </p>
          </div>

          <div className="group rounded-2xl border bg-card/50 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <Code className="mb-4 h-12 w-12 text-purple-400 transition-transform group-hover:scale-110" />

            <h3 className="mb-2 text-xl font-bold">OAuth2 Login</h3>

            <p className="text-muted-foreground">
              Google, GitHub, and custom providers integrated seamlessly.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-8 rounded-3xl border bg-card/40 p-10 backdrop-blur md:grid-cols-4">
          <div>
            <h2 className="text-4xl font-bold text-violet-400">JWT</h2>
            <p className="text-muted-foreground">Token Based Auth</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-cyan-400">OAuth2</h2>
            <p className="text-muted-foreground">Social Login</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-purple-400">RBAC</h2>
            <p className="text-muted-foreground">Role Security</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-green-400">100%</h2>
            <p className="text-muted-foreground">Secure API Access</p>
          </div>
        </div>
      </section>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="/oauth-success" element={<OAuthSuccessHandler/>}/>
        <Route path="/oauth-failure" element={<OAuthFailureHandler/>}/>
      </Routes>
    </div>
  )
}

export default App
