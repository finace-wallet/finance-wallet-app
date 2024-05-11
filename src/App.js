import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UpdateWallet from "./pages/wallet/UpdateWalletPage";
import React, { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "pages/errors/PageNotFound";
import WalletTransfer from "module/WalletTransfer";
import {
  ROUTE_ACCOUNT,
  ROUTE_ACTIVE,
  ROUTE_ANY,
  ROUTE_CATEGORY,
  ROUTE_CATEGORY_CREATE,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_TRANSFER_MONEY,
  ROUTE_WALLET,
  ROUTE_WALLET_CREATE,
  ROUTE_WALLET_DETAIL_ID,
  ROUTE_WALLET_SETTING,
  ROUTE_WALLET_TRANSACTION,
  ROUTE_WALLET_UPDATE_ID,
} from "constants/routerConstants";
import LayoutWallet from "layout/wallet/LayoutWallet";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const SignUpPage = React.lazy(() => import("./pages/user/SignUpPage"));
const SignInPage = React.lazy(() => import("./pages/user/SignInPage"));
const TestPage = React.lazy(() => import("./pages/Test"));
const ForgotPasswordPage = React.lazy(() =>
  import("./pages/ForgotPasswordPage")
);

const ChangePasswordPage = React.lazy(() =>
  import("./pages/ChangePasswordPage")
);

const CreateWalletPage = React.lazy(() =>
  import("./pages/wallet/CreateWalletPage")
);
const ListWalletPage = React.lazy(() =>
  import("./pages/wallet/listWalletPage")
);

const AccountPage = React.lazy(() => import("./pages/user/Account"));
const ActiveAccountPage = React.lazy(() => import("./pages/ActiveAccountPage"));
const WalletGeneral = React.lazy(() => import("./pages/wallet/WalletGeneral"));
const WalletDetail = React.lazy(() => import("./pages/wallet/WalletDetail"));

const TransactionCategoryPage = React.lazy(() =>
  import("./pages/TransactionCategoryPage")
);
const CreateTransactionCategoryPage = React.lazy(() =>
  import("./pages/CreateTransactionCategoryPage")
);

const CategoriesPage = React.lazy(() => import("./pages/MainSettingsPage"));

const WalletTransaction = React.lazy(() =>
  import("./pages/wallet/WalletTransaction")
);

const WalletSetting = React.lazy(() => import("./pages/wallet/WalletSettings"));

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
              path={ROUTE_ANY}
              element={<PageNotFound></PageNotFound>}
            ></Route>
            <Route path={ROUTE_HOME} element={<HomePage></HomePage>}></Route>

            <Route
              path={ROUTE_REGISTER}
              element={<SignUpPage></SignUpPage>}
            ></Route>
            <Route
              path={ROUTE_LOGIN}
              element={<SignInPage></SignInPage>}
            ></Route>
            <Route
              path={ROUTE_FORGOT_PASSWORD}
              element={<ForgotPasswordPage></ForgotPasswordPage>}
            ></Route>

            <Route
              path={ROUTE_WALLET}
              element={<ListWalletPage></ListWalletPage>}
            ></Route>

            <Route
              path={ROUTE_ACCOUNT}
              element={<AccountPage></AccountPage>}
            ></Route>
            <Route path="/test" element={<TestPage></TestPage>}></Route>
            <Route
              path={ROUTE_WALLET_CREATE}
              element={<CreateWalletPage />}
            ></Route>
            <Route
              path={ROUTE_ACTIVE}
              element={<ActiveAccountPage></ActiveAccountPage>}
            ></Route>

            <Route
              path={ROUTE_WALLET}
              element={<WalletGeneral></WalletGeneral>}
            ></Route>
            <Route
              path={ROUTE_WALLET_DETAIL_ID}
              element={<WalletDetail></WalletDetail>}
            ></Route>
            <Route
              path="/category-list"
              element={<TransactionCategoryPage></TransactionCategoryPage>}
            ></Route>
            <Route
              path="/create-transaction-category"
              element={
                <CreateTransactionCategoryPage></CreateTransactionCategoryPage>
              }
            ></Route>
            <Route
              path="categories"
              element={<CategoriesPage></CategoriesPage>}
            ></Route>
            <Route
              path={ROUTE_WALLET_TRANSACTION}
              element={<WalletTransaction></WalletTransaction>}
            ></Route>
            <Route
              path={ROUTE_WALLET_SETTING}
              element={<WalletSetting></WalletSetting>}
            ></Route>
            <Route
              path={ROUTE_WALLET_UPDATE_ID}
              element={<UpdateWallet></UpdateWallet>}
            ></Route>
            <Route
              path={ROUTE_TRANSFER_MONEY}
              element={<WalletTransfer></WalletTransfer>}
            ></Route>
            <Route
              path={ROUTE_CATEGORY}
              element={<TransactionCategoryPage></TransactionCategoryPage>}
            ></Route>
            <Route
              path={ROUTE_CATEGORY_CREATE}
              element={
                <CreateTransactionCategoryPage></CreateTransactionCategoryPage>
              }
            ></Route>
          </Routes>
        </Suspense>
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
