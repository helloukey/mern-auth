import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

type Props = {
  children: JSX.Element;
};
const Layout = ({ children }: Props) => {
  const { authorized, firstName, lastName } = useAuthContext({});
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:8000/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(res => res.json()).then(data => {
      if(data.success) {
        navigate("/login", {replace: true});
        window.location.reload();
      }
    }).catch(err => console.log(err))
  }

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-300 lg:pr-8 fixed top-0">
            <div className="flex-none">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <Link to="/" className="flex-1 px-2 mx-2 font-bold">
              Home.LLC
            </Link>
            <div className="flex-none lg:block">
              <ul className="menu menu-horizontal">
                <li>
                  {/* Search */}
                  <button onClick={() => setIsSearch(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  {/* Avatar */}
                  <div className="dropdown dropdown-left h-12 w-fit rounded-full p-0">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-8 h-8 rounded-full">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {authorized ? <li className="flex-col">
                        <span>{firstName} {lastName}</span>
                      </li> : null}
                      {authorized ? <li className="flex-col">
                        <span onClick={handleLogout}>Logout</span>
                      </li> :
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      }
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {children}
        </div>
        {/* Drawer */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-4/5 lg:w-80 bg-base-100">
            <li>
              <span>Sidebar Item 1</span>
            </li>
            <li>
              <span>Sidebar Item 2</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by Home.LLC</p>
        </div>
      </footer>

      {/* Search */}
      <div
        className={`transition-all fixed left-0 right-0 ${
          isSearch ? "top-0" : "-top-24"
        }`}
      >
        <div className="form-control p-4 lg:px-8 bg-base-200">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="w-full input input-bordered"
            />
            <button
              className="btn btn-square"
              onClick={() => setIsSearch(false)}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
