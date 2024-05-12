import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE_ACCOUNT } from "constants/routerConstants";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { setLogout } from "store/auth/authSlice";
import { logout } from "api/AuthApi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropDownAuth = () => {
  const username = useSelector((state) => state.auth.user.id);
  const usernamePart = username.split("@")[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const handleLogout = async () => {
    // Dispatch logout action
    try {
      const response = await logout();

      // Check if logout was successful (adapt status code as needed)
      if (response.status === 200) {
        dispatch(setLogout());
        toast.success("You have logged out");
        navigate("/");
      } else {
        // Handle unexpected response status
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {usernamePart}
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to={ROUTE_ACCOUNT}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Account settings
                  </NavLink>
                )}
              </Menu.Item>
              <form onSubmit={handleSubmit(handleLogout)}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default DropDownAuth;
