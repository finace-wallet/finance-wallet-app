import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import React, { Suspense } from "react";
import PageNotFound from "./pages/errors/PageNotFound";
import FormEdit from "./components/wallet/FormEdit";


const HomePage = React.lazy(() => import("./pages/HomePage"));
const SingUpPage = React.lazy(() => import("./pages/SingUpPage"));

function App() {

  return (
    <div>
      <BrowserRouter>
        <Suspense>
          <Routes>
            {/* <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/register" element={<SingUpPage></SingUpPage>}></Route>             */}
            <Route path="/abc" element={<FormEdit/>}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter> 
            
    </div>
  );
}

export default App;
