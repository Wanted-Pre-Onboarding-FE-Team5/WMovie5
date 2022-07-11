import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { RecoilRoot } from "recoil";
import Loading from "./components/Loading";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Suspense fallback={<Loading />}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </RecoilRoot>
);
