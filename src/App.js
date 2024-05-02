import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PageNotFound from "pages/errors/PageNotFound";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const SignUpPage = React.lazy(() => import("./pages/user/SignUpPage"));
const SignInPage = React.lazy(() => import("./pages/user/SignInPage"));
const TestPage = React.lazy(() => import("./pages/Test"));
const ChangePasswordPage = React.lazy(() =>
  import("./pages/ChangePasswordPage")
);
const ForgotPasswordPage = React.lazy(() =>
  import("./pages/ForgotPasswordPage")
);
const AccountPage = React.lazy(() => import("./pages/user/Account"));
const ActiveAccountPage = React.lazy(() => import("./pages/ActiveAccountPage"));
const WalletDetail = React.lazy(() => import("./pages/wallet/WalletDetail"));

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
            <Route
              path="/change-password"
              element={<ChangePasswordPage></ChangePasswordPage>}
            ></Route>
            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage></ForgotPasswordPage>}
            ></Route>
            <Route
              path="/account"
              element={<AccountPage></AccountPage>}
            ></Route>
            <Route path="/test" element={<TestPage></TestPage>}></Route>
            <Route
              path="/active"
              element={<ActiveAccountPage></ActiveAccountPage>}
            ></Route>
          </Routes>
        </Suspense>
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
