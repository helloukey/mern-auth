import LoginForm from "../components/LoginForm"

type Props = {}
const Login = (props: Props) => {
  return (
    <div className="mt-16 lg:mt-24 pb-24">
      <h2 className="text-2xl text-center font-semibold py-4">Login</h2>
      <LoginForm />
    </div>
  )
}
export default Login