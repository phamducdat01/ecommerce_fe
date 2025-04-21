// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // có thể tùy chỉnh màu chủ đề tại đây
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
