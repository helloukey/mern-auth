import { createContext, useReducer, Dispatch, useEffect } from "react";

type State = {
  authorized: boolean;
  loading: boolean;
  firstName: string;
  lastName: string;
};

type ACTIONTYPE =
  | { type: "SET_AUTHORIZED"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string };

type Context = {
  authorized: boolean;
  loading: boolean;
  firstName: string;
  lastName: string;
  dispatch: Dispatch<ACTIONTYPE>;
};

const authReducer = (state: State, action: ACTIONTYPE) => {
  switch (action.type) {
    case "SET_AUTHORIZED": {
      return { ...state, authorized: action.payload };
    }
    case "SET_LOADING": {
      return { ...state, loading: action.payload };
    }
    case "SET_FIRST_NAME": {
      return { ...state, firstName: action.payload };
    }
    case "SET_LAST_NAME": {
      return { ...state, lastName: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const Auth = createContext<Context | null>(null);
type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  //   const { dispatch: dispatchApp } = useAuthContext({});
  const [state, dispatch] = useReducer(authReducer, {
    authorized: false,
    loading: false,
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    fetch("https://mern-auth-backend-q1ev.onrender.com/check-user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_AUTHORIZED", payload: data.authorized });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_FIRST_NAME", payload: data.firstName });
        dispatch({ type: "SET_LAST_NAME", payload: data.lastName });
      })
      .catch((err) => dispatch({ type: "SET_LOADING", payload: false }));
  }, []);

  return (
    <Auth.Provider value={{ ...state, dispatch }}>{children}</Auth.Provider>
  );
};
export default AuthProvider;
