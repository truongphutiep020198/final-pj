import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import "antd/dist/antd.min.css";

import store from "./store/index";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
);