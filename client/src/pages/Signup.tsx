import SignupForm from "../components/SignupForm";

type Props = {};
const Signup = (props: Props) => {
  return (
    <div className="mt-16 lg:mt-24 pb-24">
      <h2 className="text-2xl text-center font-semibold py-4">Signup</h2>
      <SignupForm />
    </div>
  );
};
export default Signup;
