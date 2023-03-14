import { useContext } from "react";
import { Auth } from "../context/AuthProvider";

type Props = {};
const useAuthContext = (props: Props) => {
  const context = useContext(Auth);
  if (!context) {
    throw new Error(
      "Auth must be wrapped inside the AuthProvider."
    );
  }

  return context;
};
export default useAuthContext;