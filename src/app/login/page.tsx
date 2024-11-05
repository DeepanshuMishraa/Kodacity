import LoginForm from "~/components/LoginComponent"
import LandingNavbar from "~/components/Navbar"

const Login = () => {
  return (
    <>
    <LandingNavbar/>
    <div className="flex items-center justify-center h-screen motion-preset-focus motion-duration-300">
        <LoginForm/>
    </div>
    </>
  )
}

export default Login
