import ResetForm from "../components/ResetForm";

type Props = {};
const PasswordReset = (props: Props) => {
  return (
    <div className="mt-16 lg:mt-24 pb-24">
      <h2 className="text-2xl text-center font-semibold py-4">Reset Password</h2>
      <ResetForm />
    </div>
  );
};
export default PasswordReset;