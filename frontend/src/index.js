import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'jotai'



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div style={{height: "100%"}}>
    <Provider >
    <BrowserRouter>
      
        <App />
     
    </BrowserRouter>
    </Provider>
  </div>
);
