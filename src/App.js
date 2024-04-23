import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import PageNotFound from "./pages/errors/PageNotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const SignUpPage = React.lazy(() => import("./pages/user/SignUpPage"));
const SignInPage = React.lazy(() => import("./pages/user/SignInPage"));
const TestPage = React.lazy(() => import("./pages/Test"));
const ChangePasswordPage = React.lazy(() => import("./pages/ChangePasswordPage"));
const ForgotPasswordPage = React.lazy(() => import("./pages/ForgotPasswordPage"));
const DeleteUserPage = React.lazy(() => import("./pages/DeleteUserPage"));

const SettingPage = React.lazy(() => import("./pages/user/UserSetting"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/login" element={<SignInPage></SignInPage>}></Route>
            <Route path="/change-password" element={<ChangePasswordPage></ChangePasswordPage>}></Route>
            <Route path="/forgot-password" element={<ForgotPasswordPage></ForgotPasswordPage>}></Route>

            <Route
              path="/user-setting"
              element={<SettingPage></SettingPage>}
            ></Route>
            <Route path="/test" element={<TestPage></TestPage>}></Route>
            <Route path="/delete-user" element={<DeleteUserPage></DeleteUserPage>}></Route>
          </Routes>
        </Suspense>
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
