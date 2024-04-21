import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import PageNotFound from "./pages/errors/PageNotFound";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const SingUpPage = React.lazy(() => import("./pages/SingUpPage"));
const SignUpPageNew = React.lazy(() => import("./pages/SignUpPageNew"));

function App() {
  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/register" element={<SingUpPage></SingUpPage>}></Route>
          <Route
            path="/sign-up"
            element={<SignUpPageNew></SignUpPageNew>}
          ></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
